import { NextRequest, NextResponse } from 'next/server';

const familyChildren = [
  {
    name: 'Ayan Rahman',
    id: 'ayan-01',
    device: 'Android phone',
    active: true,
    lastSeen: 'Active now',
  },
  {
    name: 'Maliha Rahman',
    id: 'maliha-02',
    device: 'iPhone',
    active: false,
    lastSeen: 'Last active 18 min ago',
  },
  {
    name: 'Rafi Rahman',
    id: 'rafi-03',
    device: 'Android tablet',
    active: true,
    lastSeen: 'Active now',
  },
];

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get('role');
  const identifier =
    request.nextUrl.searchParams.get('identifier') ?? 'Safetly user';

  if (role !== 'parent' && role !== 'kid') {
    return NextResponse.json(
      { error: 'A valid account role is required.' },
      { status: 400 }
    );
  }

  if (role === 'parent') {
    return NextResponse.json({
      role,
      identifier,
      children: familyChildren,
      activeCount: familyChildren.filter((child) => child.active).length,
      connectionStatus: 'Protected',
    });
  }

  return NextResponse.json({
    role,
    identifier,
    device: {
      active: true,
      status: 'Active',
      message: 'Safetly is connected and protecting this device now.',
    },
    subscription: {
      packageName: 'Yearly Premium',
      originalAmount: 1199,
      discountAmount: 200,
      paidAmount: 999,
      paidAt: '2026-09-09T10:30:00.000Z',
      paymentStatus: 'approved',
      orderId: 'ORDER-DEMO1001',
      transactionId: 'BGH7X2K9QL',
      expireDate: '2027-12-31T23:59:59.000Z',
      daysRemaining: Math.max(
        0,
        Math.ceil(
          (new Date('2027-12-31T23:59:59.000Z').getTime() - Date.now()) /
            86_400_000
        )
      ),
    },
  });
}
