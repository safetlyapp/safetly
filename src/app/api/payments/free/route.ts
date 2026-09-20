import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === 'string' ? body.identifier.trim() : '';
  const planId = typeof body?.plan_id === 'string' ? body.plan_id.trim() : '';
  if (!identifier || !planId)
    return NextResponse.json(
      { error: 'A valid child and plan are required.' },
      { status: 400 }
    );
  const childLookup = await requestParentChildApi(
    `/api/child/lookup?identifier=${encodeURIComponent(identifier)}`
  );
  if (!childLookup)
    return NextResponse.json(
      { error: 'Parent/Child API is not configured.' },
      { status: 503 }
    );
  if (childLookup.status < 200 || childLookup.status >= 300)
    return NextResponse.json(childLookup.payload, { status: childLookup.status });
  const child = (childLookup.payload as { user?: { email?: string } }).user;
  if (!child?.email)
    return NextResponse.json({ error: 'Child email was not returned by the API.' }, { status: 502 });

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
