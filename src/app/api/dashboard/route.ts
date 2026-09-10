import { NextRequest, NextResponse } from 'next/server';
import { children } from '@/lib/demo-auth';

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

  const child = children.find(
    (item) =>
      item.email === identifier.toLowerCase() ||
      item.username === identifier.toLowerCase()
  );
  const paymentHistory = await getPaymentHistory(identifier);
  const latestApproved = paymentHistory.find(
    (payment) => payment.status === 'approved'
  );

  return NextResponse.json({
    role,
    identifier,
    device: {
      active: true,
      status: 'Active',
      message: 'Safetly is connected and protecting this device now.',
    },
    subscription:
      latestApproved && child
        ? {
            packageName: latestApproved.packageName,
            originalAmount:
              latestApproved.originalAmount ?? latestApproved.submittedAmount,
            discountAmount: latestApproved.discountAmount ?? 0,
            paidAmount:
              latestApproved.verifiedAmount ?? latestApproved.submittedAmount,
            paidAt: latestApproved.paidAt,
            paymentStatus: latestApproved.status,
            orderId: latestApproved.orderId,
            transactionId: latestApproved.transactionId,
            expireDate: child.expireDate,
            daysRemaining: Math.max(
              0,
              Math.ceil(
                (new Date(child.expireDate).getTime() - Date.now()) / 86_400_000
              )
            ),
          }
        : null,
    paymentHistory,
  });
}

async function getPaymentHistory(identifier: string) {
  const child = children.find(
    (item) =>
      item.email === identifier.toLowerCase() ||
      item.username === identifier.toLowerCase()
  );
  const backendUrl = process.env.BACKEND_API_URL;
  const internalKey = process.env.INTERNAL_API_SECRET;
  if (!child || !backendUrl || !internalKey) return [];

  try {
    const response = await fetch(
      `${backendUrl}/api/payments/records?customerEmail=${encodeURIComponent(child.email)}`,
      { headers: { 'x-internal-api-key': internalKey }, cache: 'no-store' }
    );
    if (!response.ok) return [];
    const payload = (await response.json()) as {
      records?: Array<Record<string, unknown>>;
    };
    return (payload.records ?? []).map((record) => ({
      orderId: String(record.orderId ?? ''),
      transactionId: String(record.trxId ?? ''),
      submittedAmount: Number(record.submittedAmount ?? 0),
      verifiedAmount:
        record.verifiedAmount === null
          ? null
          : Number(record.verifiedAmount ?? 0),
      packageName:
        typeof record.packageName === 'string'
          ? record.packageName
          : 'Safetly subscription',
      originalAmount:
        record.originalAmount === null
          ? null
          : Number(record.originalAmount ?? 0),
      discountAmount:
        record.discountAmount === null
          ? null
          : Number(record.discountAmount ?? 0),
      status: String(record.status ?? 'pending'),
      paidAt: String(record.verifiedAt ?? record.createdAt ?? ''),
    }));
  } catch {
    return [];
  }
}
