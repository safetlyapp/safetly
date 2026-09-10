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
  const finalAmount = Number.isFinite(amount)
    ? Math.round(amount * 100) / 100
    : amount;
  const metadata = {
    plan_id: typeof body?.plan_id === 'string' ? body.plan_id : '',
    package_name:
      typeof body?.package_name === 'string' ? body.package_name : '',
    original_amount:
      typeof body?.original_amount === 'string' ? body.original_amount : '',
    discount_amount:
      typeof body?.discount_amount === 'string' ? body.discount_amount : '',
  };

  if (
    !gatewayEnv[gateway] ||
    !email ||
    !Number.isFinite(finalAmount) ||
    finalAmount <= 0
  ) {
    return NextResponse.json(
      { error: 'A valid gateway, customer email, and amount are required.' },
      { status: 400 }
    );
  }

  console.info('[payment.start] final checkout amount', {
    gateway,
    amount: finalAmount.toFixed(2),
    customerEmail: email,
    planId: typeof body?.plan_id === 'string' ? body.plan_id : undefined,
  });

  const redirectUrl = process.env[gatewayEnv[gateway]];
  if (!redirectUrl) {
    const mockUrl = new URL(`/checkout/${gateway}`, request.url);
    mockUrl.searchParams.set(
      'order_id',
      `ORDER-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`
    );
    mockUrl.searchParams.set('amount', finalAmount.toFixed(2));
    mockUrl.searchParams.set('customer_email', email);
    for (const [key, value] of Object.entries(metadata)) {
      if (value) mockUrl.searchParams.set(key, value);
    }
    return NextResponse.json({
      orderId: mockUrl.searchParams.get('order_id'),
      redirectUrl: mockUrl.toString(),
      mock: true,
    });
  }

  const orderId = `ORDER-${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}`;
  const target = new URL(redirectUrl);
  target.searchParams.set('order_id', orderId);
  target.searchParams.set('amount', finalAmount.toFixed(2));
  target.searchParams.set('customer_email', email);
  for (const [key, value] of Object.entries(metadata)) {
    if (value) target.searchParams.set(key, value);
  }

  return NextResponse.json({ orderId, redirectUrl: target.toString() });
}
