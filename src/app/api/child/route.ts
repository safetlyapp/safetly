import { NextRequest, NextResponse } from 'next/server';
import { children, parents, publicChild, readToken } from '@/lib/demo-auth';

export async function GET(request: NextRequest) {
  const token = readToken(request.headers.get('authorization'));
  if (!token || token.role !== 'parent')
    return NextResponse.json(
      { error: 'Parent authorization required.' },
      { status: 401 }
    );
  const parent = parents.find((item) => item.id === token.sub);
  const identifier = request.nextUrl.searchParams
    .get('identifier')
    ?.trim()
    .toLowerCase();
  const child = children.find(
    (item) =>
      item.parentId === parent?.id &&
      (item.username === identifier || item.email === identifier)
  );
  if (!child)
    return NextResponse.json(
      { error: 'Child not found for this parent.' },
      { status: 404 }
    );
  return NextResponse.json({ child: publicChild(child) });
}
