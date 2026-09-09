import { NextRequest, NextResponse } from 'next/server';

const payConfirmUrl = 'https://pay-confirm.vercel.app/api/v1/verify';

type VerifyInput = {
  trx_id: string;
  amount: string;
  sender_phone_number: string;
  customer_email: string;
  order_id: string;
};

function paymentStatus(httpStatus: number, payConfirmStatus?: string) {
  if (httpStatus === 200 || payConfirmStatus === 'approved') return 'approved';
  if (payConfirmStatus === 'amount_mismatch') return 'held_for_review';
  if (payConfirmStatus === 'sender_unverifiable') return 'manual_review';
  if (payConfirmStatus === 'pending_or_not_found' || httpStatus === 404)
    return 'pending';
  if (payConfirmStatus === 'reversed') return 'reversed';
  if (payConfirmStatus === 'already_used') return 'already_claimed';
  return 'rejected';
}

function readInput(body: unknown): VerifyInput | null {
  if (!body || typeof body !== 'object') return null;
  const value = body as Record<string, unknown>;
  const fields = [
    'trx_id',
    'amount',
    'sender_phone_number',
    'customer_email',
    'order_id',
  ] as const;
  if (
    !fields.every(
      (field) => typeof value[field] === 'string' && value[field].trim()
    )
  )
    return null;
  return Object.fromEntries(
    fields.map((field) => [field, (value[field] as string).trim()])
  ) as VerifyInput;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.PAYCONFIRM_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      { error: 'Payment verification is not configured.' },
      { status: 503 }
    );

  const input = readInput(await request.json().catch(() => null));
  if (!input)
    return NextResponse.json(
      {
        error:
          'trx_id, amount, sender_phone_number, customer_email, and order_id are required.',
      },
      { status: 400 }
    );

  try {
    const response = await fetch(payConfirmUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
      cache: 'no-store',
    });
    const payload = await response.json().catch(() => ({
      status: 'unknown',
      reason: 'Invalid PayConfirm response',
    }));

    const result = payload as {
      status?: string;
      reason?: string;
      verified_amount?: string | number;
      verified_at?: string;
    };
    const backendUrl = process.env.BACKEND_API_URL;
    const internalKey = process.env.INTERNAL_API_SECRET;
    if (!backendUrl || !internalKey)
      return NextResponse.json(
        { error: 'Payment record service is not configured.' },
        { status: 503 }
      );
    const recordResponse = await fetch(
      new URL('/api/payments/records', backendUrl),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-api-key': internalKey,
        },
        body: JSON.stringify({
          orderId: input.order_id,
          trxId: input.trx_id,
          customerEmail: input.customer_email,
          senderPhoneNumber: input.sender_phone_number,
          submittedAmount: input.amount,
          verifiedAmount:
            result.verified_amount === undefined
              ? null
              : String(result.verified_amount),
          status: paymentStatus(response.status, result.status),
          payconfirmStatus: result.status ?? null,
          payconfirmReason: result.reason ?? null,
          payconfirmResponse: payload,
          verifiedAt:
            result.verified_at ??
            (response.status === 200 ? new Date().toISOString() : null),
        }),
        cache: 'no-store',
      }
    );
    if (!recordResponse.ok)
      return NextResponse.json(
        {
          error:
            'Payment verified but could not be saved. Please contact support.',
        },
        { status: 503 }
      );

    return NextResponse.json(
      { ok: response.status === 200, status: response.status, result: payload },
      { status: response.status }
    );
  } catch {
    return NextResponse.json(
      { error: 'Payment verification service is unavailable.' },
      { status: 503 }
    );
  }
}
