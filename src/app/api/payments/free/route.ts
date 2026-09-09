import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { children } from '@/lib/demo-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier =
    typeof body?.identifier === 'string'
      ? body.identifier.trim().toLowerCase()
      : '';
  const planId = typeof body?.plan_id === 'string' ? body.plan_id.trim() : '';
  const child = children.find(
    (item) => item.email === identifier || item.username === identifier
  );
  if (!child || !planId)
    return NextResponse.json(
      { error: 'A valid child and plan are required.' },
      { status: 400 }
    );

  const backendUrl = process.env.BACKEND_API_URL;
  const internalKey = process.env.INTERNAL_API_SECRET;
  if (!backendUrl || !internalKey)
    return NextResponse.json(
      { error: 'Payment record service is not configured.' },
      { status: 503 }
    );

  const orderId = `ORDER-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`;
  const response = await fetch(new URL('/api/payments/records', backendUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-api-key': internalKey,
    },
    body: JSON.stringify({
      orderId,
      trxId: `FREE-${orderId}`,
      customerEmail: child.email,
      senderPhoneNumber: 'N/A',
      submittedAmount: '0.00',
      verifiedAmount: '0.00',
      status: 'approved',
      payconfirmStatus: 'free_order',
      payconfirmReason:
        'No payment required because the final amount was zero.',
      payconfirmResponse: { free: true, planId },
      verifiedAt: new Date().toISOString(),
    }),
    cache: 'no-store',
  });

  if (!response.ok)
    return NextResponse.json(
      { error: 'Could not save the free order.' },
      { status: 503 }
    );
  return NextResponse.json({ orderId, customerEmail: child.email });
}
