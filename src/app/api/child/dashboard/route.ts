import { NextRequest, NextResponse } from 'next/server';
import { children, publicChild, readToken } from '@/lib/demo-auth';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function GET(request: NextRequest) {
  const external = await requestParentChildApi('/api/child/dashboard', {
    headers: { Authorization: request.headers.get('authorization') ?? '' },
  });
  if (external)
    return NextResponse.json(external.payload, { status: external.status });
  const token = readToken(request.headers.get('authorization'));
  if (!token || token.role !== 'child') {
    return NextResponse.json(
      { success: false, error: 'Child authorization required.' },
      { status: 401 }
    );
  }

  const child = children.find((item) => item.id === token.sub);
  if (!child) {
    return NextResponse.json(
      { success: false, error: 'Child not found.' },
      { status: 404 }
    );
  }

  const profile = publicChild(child);
  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(child.expireDate).getTime() - Date.now()) / 86_400_000)
  );

  return NextResponse.json({
    success: true,
    profile: {
      id: profile.id,
      name: profile.name,
      username: profile.username,
      email: profile.email,
      parentId: child.parentId,
    },
    device: {
      active: profile.active,
      status: profile.active ? 'Active' : 'Inactive',
      lastSeen: profile.lastSeen,
    },
    premium: {
      expireDate: profile.expireDate,
      isPremium: profile.isPremium,
      daysRemaining,
    },
  });
}
