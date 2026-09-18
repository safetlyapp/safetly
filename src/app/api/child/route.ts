import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function GET(request: NextRequest) {
  const identifier = request.nextUrl.searchParams.get('identifier')?.trim();
  const external = await requestParentChildApi(
    `/api/child?identifier=${encodeURIComponent(identifier ?? '')}`,
    { headers: { Authorization: request.headers.get('authorization') ?? '' } }
  );
  if (!external)
    return NextResponse.json(
      { error: 'Parent/Child API is not configured.' },
      { status: 503 }
    );
  return NextResponse.json(external.payload, { status: external.status });
}
