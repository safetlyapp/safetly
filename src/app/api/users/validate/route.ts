import { NextRequest, NextResponse } from 'next/server';
import { children } from '@/lib/demo-auth';

export async function GET(request: NextRequest) {
  const identifier =
    request.nextUrl.searchParams.get('identifier')?.trim().toLowerCase() ?? '';
  const child = children.find(
    (item) => item.email === identifier || item.username === identifier
  );
  if (!child)
    return NextResponse.json({
      valid: false,
      message: 'No matching child username or email found.',
    });

  return NextResponse.json({
    valid: true,
    user: {
      name: child.username,
      identifier: child.username,
      email: child.email,
    },
  });
}
