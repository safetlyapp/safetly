import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function GET(request: NextRequest) {
  const identifier = request.nextUrl.searchParams.get('identifier')?.trim() ?? '';
  const external = await requestParentChildApi(
    `/api/child/lookup?identifier=${encodeURIComponent(identifier)}`
  );
  if (!external)
    return NextResponse.json({
      valid: false,
      message: 'Parent/Child API is not configured.',
    }, { status: 503 });
  if (external.status === 404)
    return NextResponse.json({
      valid: false,
      message: 'No matching child username or email found.',
    });
  return NextResponse.json(external.payload, { status: external.status });
}
