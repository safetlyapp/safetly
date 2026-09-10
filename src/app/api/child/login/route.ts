import { NextRequest, NextResponse } from 'next/server';
import {
  children,
  createToken,
  publicChild,
  verifyPassword,
} from '@/lib/demo-auth';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const external = await requestParentChildApi('/api/child/login', {
    method: 'POST',
    body,
  });
  if (external)
    return NextResponse.json(external.payload, { status: external.status });
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
