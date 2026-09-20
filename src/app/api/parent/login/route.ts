import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const external = await requestParentChildApi('/api/parent/login', {
    method: 'POST',
    body,
  });
  if (!external)
    return NextResponse.json(
      { error: 'Parent/Child API is not configured.' },
      { status: 503 }
    );
  return NextResponse.json(external.payload, { status: external.status });
}
