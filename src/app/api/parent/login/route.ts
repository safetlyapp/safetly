import { NextRequest, NextResponse } from 'next/server';
import { createToken, parents, verifyPassword } from '@/lib/demo-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email =
    typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const parent = parents.find((item) => item.email === email);
  console.log('login', { email, password, parent });
  if (!parent || !verifyPassword(password, parent.passwordHash))
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );
  return NextResponse.json({
    token: createToken({ sub: parent.id, role: 'parent' }),
    profile: { id: parent.id, name: parent.name, email: parent.email },
  });
}
