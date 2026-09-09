import { NextRequest, NextResponse } from 'next/server';
import {
  children,
  createToken,
  publicChild,
  verifyPassword,
} from '@/lib/demo-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier =
    typeof body?.identifier === 'string'
      ? body.identifier.trim().toLowerCase()
      : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const child = children.find(
    (item) => item.email === identifier || item.username === identifier
  );
  if (!child || !verifyPassword(password, child.passwordHash))
    return NextResponse.json(
      { error: 'Invalid email/username or password.' },
      { status: 401 }
    );
  return NextResponse.json({
    token: createToken({ sub: child.id, role: 'child' }),
    profile: publicChild(child),
  });
}
