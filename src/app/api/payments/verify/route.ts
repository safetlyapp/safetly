import { NextRequest, NextResponse } from 'next/server';

const defaultPayConfirmUrl = 'https://api-payconfirm.duckdns.org/api/v1/verify';

type VerifyInput = {
  trx_id: string;
  amount: string;
  sender_phone_number: string;
  customer_email: string;
  order_id: string;
  plan_id?: string;
  package_name?: string;
  original_amount?: string;
  discount_amount?: string;
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
  return {
    ...Object.fromEntries(
      fields.map((field) => [field, (value[field] as string).trim()])
    ),
    plan_id:
      typeof value.plan_id === 'string' ? value.plan_id.trim() : undefined,
    package_name:
      typeof value.package_name === 'string'
        ? value.package_name.trim()
        : undefined,
    original_amount:
      typeof value.original_amount === 'string'
        ? value.original_amount.trim()
        : undefined,
    discount_amount:
      typeof value.discount_amount === 'string'
        ? value.discount_amount.trim()
        : undefined,
  } as VerifyInput;
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

  console.info('[payment.verify] request received', {
    trxId: `${input.trx_id.slice(0, 3)}***${input.trx_id.slice(-4)}`,
    amount: input.amount,
    senderPhone: `******${input.sender_phone_number.slice(-4)}`,
    customerEmail: input.customer_email,
    orderId: input.order_id,
  });

  try {
    const response = await fetch(
      process.env.PAYCONFIRM_VERIFY_URL ?? defaultPayConfirmUrl,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(input),
        cache: 'no-store',
      }
    );
    console.log({ response });
    const payload = await response.json().catch(() => ({
      status: 'unknown',
      reason: 'Invalid PayConfirm response',
    }));

    console.info('[payment.verify] PayConfirm response', {
      httpStatus: response.status,
      status: (payload as { status?: string }).status,
      reason: (payload as { reason?: string }).reason,
      amount: (payload as { amount?: string | number }).amount,
      verifiedAmount: (payload as { verified_amount?: string | number })
        .verified_amount,
      trackingNumber: (payload as { tracking_number?: string }).tracking_number,
    });

    const result = payload as {
      status?: string;
      reason?: string;
      amount?: string | number;
      verified_amount?: string | number;
      verified_at?: string;
      tracking_number?: string;
    };
    const verifiedAmount = result.verified_amount ?? result.amount ?? null;
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
          planId: input.plan_id,
          packageName: input.package_name,
          customerEmail: input.customer_email,
          senderPhoneNumber: input.sender_phone_number,
          originalAmount: input.original_amount,
          discountAmount: input.discount_amount,
          submittedAmount: input.amount,
          verifiedAmount:
            verifiedAmount === null ? null : String(verifiedAmount),
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
    const recordResponseBody = await recordResponse.text();
    console.info('[payment.verify] admin record response', {
      httpStatus: recordResponse.status,
      ok: recordResponse.ok,
      body: recordResponseBody.slice(0, 500),
    });
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
  } catch (error) {
    console.error('[payment.verify] request failed', error);
    return NextResponse.json(
      { error: 'Payment verification service is unavailable.' },
      { status: 503 }
    );
  }
}
