import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function GET(request: NextRequest) {
  const external = await requestParentChildApi('/api/parent/children', {
    headers: { Authorization: request.headers.get('authorization') ?? '' },
  });
  if (!external)
    return NextResponse.json(
      { error: 'Parent/Child API is not configured.' },
      { status: 503 }
    );
  return NextResponse.json(external.payload, { status: external.status });
}
