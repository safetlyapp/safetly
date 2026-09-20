import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === 'string' ? body.identifier.trim() : '';
  const code =
    typeof body?.couponCode === 'string'
      ? body.couponCode.trim().toUpperCase()
      : '';

  if (!identifier)
    return NextResponse.json(
      { error: 'Enter your email or username first.' },
      { status: 400 }
    );
  if (!identifier)
    return NextResponse.json(
      { error: 'Enter a valid email address or username.' },
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
  if (childLookup.status === 404)
    return NextResponse.json(
      { error: 'No Seftly user was found with this email or username.' },
      { status: 404 }
    );
  if (childLookup.status < 200 || childLookup.status >= 300)
    return NextResponse.json(childLookup.payload, { status: childLookup.status });

  const child = childLookup.payload as {
    user?: { id?: string; email?: string };
  };
  if (!child.user?.email)
    return NextResponse.json(
      { error: 'Child email was not returned by the API.' },
      { status: 502 }
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
      body: JSON.stringify({
        userId: toStableUuid(child.user.id ?? child.user.email),
        couponCode: code,
      }),
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

function toStableUuid(value: string) {
  const hex = createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-8${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}
