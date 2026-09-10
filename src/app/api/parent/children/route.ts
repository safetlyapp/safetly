import { NextRequest, NextResponse } from 'next/server';
import { children, parents, publicChild, readToken } from '@/lib/demo-auth';
import { requestParentChildApi } from '@/lib/parent-child-source';

export async function GET(request: NextRequest) {
  const external = await requestParentChildApi('/api/parent/children', {
    headers: { Authorization: request.headers.get('authorization') ?? '' },
  });
  if (external)
    return NextResponse.json(external.payload, { status: external.status });
  const token = readToken(request.headers.get('authorization'));
  if (!token || token.role !== 'parent') {
    return NextResponse.json(
      { success: false, error: 'Parent authorization required.' },
      { status: 401 }
    );
  }

  const parent = parents.find((item) => item.id === token.sub);
  if (!parent) {
    return NextResponse.json(
      { success: false, error: 'Parent not found.' },
      { status: 404 }
    );
  }

  const ownChildren = children.filter((child) => child.parentId === parent.id);
  const publicChildren = ownChildren.map(publicChild);

  return NextResponse.json({
    success: true,
    parent: { id: parent.id, name: parent.name, email: parent.email },
    children: publicChildren,
    summary: {
      totalChildren: publicChildren.length,
      activeChildren: publicChildren.filter((child) => child.active).length,
      premiumChildren: publicChildren.filter((child) => child.isPremium).length,
    },
  });
}
