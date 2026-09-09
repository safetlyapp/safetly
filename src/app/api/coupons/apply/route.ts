import { NextRequest, NextResponse } from 'next/server';
import { children } from '@/lib/demo-auth';

const userIds: Record<string, string> = {
  'parent@safetly.test': '00000000-0000-4000-8000-000000000001',
  'ayan@safetly.test': '00000000-0000-4000-8000-000000000002',
  'ayan-01': '00000000-0000-4000-8000-000000000002',
  'maliha@safetly.test': '00000000-0000-4000-8000-000000000003',
  'maliha-02': '00000000-0000-4000-8000-000000000003',
  'rafi@safetly.test': '00000000-0000-4000-8000-000000000004',
  'rafi-03': '00000000-0000-4000-8000-000000000004',
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier =
    typeof body?.identifier === 'string'
      ? body.identifier.trim().toLowerCase()
      : '';
  const code =
    typeof body?.couponCode === 'string'
      ? body.couponCode.trim().toUpperCase()
      : '';

  if (!identifier)
    return NextResponse.json(
      { error: 'Enter your email or username first.' },
      { status: 400 }
    );
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const isUsername = /^[a-z0-9][a-z0-9._-]{2,31}$/.test(identifier);
  if (!isEmail && !isUsername)
    return NextResponse.json(
      { error: 'Enter a valid email address or username.' },
      { status: 400 }
    );

  const userExists = children.some(
    (child) => child.email === identifier || child.username === identifier
  );
  if (!userExists)
    return NextResponse.json(
      { error: 'No Safetly user was found with this email or username.' },
      { status: 404 }
    );

  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl)
    return NextResponse.json(
      { error: 'Coupon service is not configured.' },
      { status: 503 }
    );
  try {
    const response = await fetch(new URL('/api/coupons/apply', backendUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ userId: userIds[identifier], couponCode: code }),
      cache: 'no-store',
    });
    const payload = await response
      .json()
      .catch(() => ({ error: 'Unable to apply coupon.' }));
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: 'Coupon service is unavailable.' },
      { status: 503 }
    );
  }
}
