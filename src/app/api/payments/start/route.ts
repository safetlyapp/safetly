import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const gatewayEnv: Record<string, string> = {
  bkash: 'BKASH_CHECKOUT_URL',
  nagad: 'NAGAD_CHECKOUT_URL',
  rocket: 'ROCKET_CHECKOUT_URL',
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const gateway = typeof body?.gateway === 'string' ? body.gateway : '';
  const email =
    typeof body?.customer_email === 'string' ? body.customer_email.trim() : '';
  const amount =
    typeof body?.amount === 'number' ? body.amount : Number(body?.amount);

  if (
    !gatewayEnv[gateway] ||
    !email ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return NextResponse.json(
      { error: 'A valid gateway, customer email, and amount are required.' },
      { status: 400 }
    );
  }

  const redirectUrl = process.env[gatewayEnv[gateway]];
  if (!redirectUrl) {
    const mockUrl = new URL(`/checkout/gateway/${gateway}`, request.url);
    mockUrl.searchParams.set(
      'order_id',
      `ORDER-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`
    );
    mockUrl.searchParams.set('amount', amount.toFixed(2));
    mockUrl.searchParams.set('customer_email', email);
    return NextResponse.json({
      orderId: mockUrl.searchParams.get('order_id'),
      redirectUrl: mockUrl.toString(),
      mock: true,
    });
  }

  const orderId = `ORDER-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`;
  const target = new URL(redirectUrl);
  target.searchParams.set('order_id', orderId);
  target.searchParams.set('amount', amount.toFixed(2));
  target.searchParams.set('customer_email', email);

  return NextResponse.json({ orderId, redirectUrl: target.toString() });
}
