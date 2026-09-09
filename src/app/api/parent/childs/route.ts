import { NextRequest, NextResponse } from 'next/server';
import { children, parents, publicChild, readToken } from '@/lib/demo-auth';

export async function GET(request: NextRequest) {
  const token = readToken(request.headers.get('authorization'));
  if (!token || token.role !== 'parent')
    return NextResponse.json(
      { error: 'Parent authorization required.' },
      { status: 401 }
    );
  const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase();
  const parent = parents.find(
    (item) => item.id === token.sub && item.email === email
  );
  if (!parent)
    return NextResponse.json(
      { error: 'You can only access your own children.' },
      { status: 403 }
    );
  const ownChildren = children.filter((child) => child.parentId === parent.id);
  return NextResponse.json({
    children: ownChildren.map(publicChild),
    total: ownChildren.length,
    activeCount: ownChildren.filter((child) => child.active).length,
  });
}
