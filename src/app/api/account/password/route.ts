import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function PATCH(request: NextRequest) {
  const authorization = request.headers.get('authorization') ?? '';
  if (!authorization)
    return NextResponse.json(
      { error: 'Authentication is required.' },
      { status: 401 }
    );

  const body = await request.json().catch(() => null);
  const external = await requestParentChildApi('/api/account/password', {
    method: 'PATCH',
    headers: { Authorization: authorization },
    body,
  });
  if (!external)
    return NextResponse.json(
      { error: 'Parent/Child API is not configured.' },
      { status: 503 }
    );
  return NextResponse.json(external.payload, { status: external.status });
}
