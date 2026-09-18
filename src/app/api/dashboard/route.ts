import { NextRequest, NextResponse } from 'next/server';
import { requestParentChildApi } from '@/lib/parent-child-source';

type ExternalChildDashboard = {
  profile?: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    parentId?: string;
  };
  device?: {
    active?: boolean;
    status?: string;
    message?: string;
  };
  premium?: {
    expireDate?: string | null;
    isPremium?: boolean;
    daysRemaining?: number;
  };
};

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get('role');
  const identifier = request.nextUrl.searchParams.get('identifier') ?? '';
  const authorization = request.headers.get('authorization') ?? '';

  if (role !== 'parent' && role !== 'kid') {
    return NextResponse.json(
      { error: 'A valid account role is required.' },
      { status: 400 }
    );
  }

  const external = await requestParentChildApi(
    role === 'parent' ? '/api/parent/children' : '/api/child/dashboard',
    { headers: { Authorization: authorization } }
  );
  if (!external) {
    return NextResponse.json(
      { error: 'Parent/Child API is not configured.' },
      { status: 503 }
    );
  }
  if (external.status < 200 || external.status >= 300) {
    return NextResponse.json(external.payload, { status: external.status });
  }

  if (role === 'parent') {
    const payload = external.payload as {
      parent?: { email?: string };
      children?: Array<{
        id?: string;
        name?: string;
        username?: string;
        email?: string;
        device?: string;
        active?: boolean;
        lastSeen?: string;
      }>;
      summary?: { activeChildren?: number };
    };
    const children = (payload.children ?? []).map((child) => ({
      name: child.name ?? child.username ?? 'Child',
      id: child.id ?? child.username ?? child.email ?? '',
      device: child.device ?? 'Connected device',
      active: child.active ?? false,
      lastSeen: child.lastSeen ?? 'No recent activity',
    }));
    return NextResponse.json({
      role,
      identifier: payload.parent?.email ?? identifier,
      children,
      activeCount:
        payload.summary?.activeChildren ??
        children.filter((child) => child.active).length,
      connectionStatus: 'Protected',
    });
  }

  const payload = external.payload as ExternalChildDashboard;
  const email = payload.profile?.email ?? '';
  const paymentHistory = email ? await getPaymentHistory(email) : [];
  const latestApproved = paymentHistory.find(
    (payment) => payment.status === 'approved'
  );
  const premium = payload.premium;

  return NextResponse.json({
    role,
    identifier: email || identifier,
    device: {
      active: payload.device?.active ?? false,
      status: payload.device?.status ?? 'Inactive',
      message:
        payload.device?.message ??
        'Seftly device status is available from the Parent/Child API.',
    },
    subscription:
      latestApproved && premium
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
            expireDate: premium.expireDate ?? '',
            daysRemaining: premium.daysRemaining ?? 0,
          }
        : null,
    paymentHistory,
  });
}

async function getPaymentHistory(email: string) {
  const backendUrl = process.env.BACKEND_API_URL;
  const internalKey = process.env.INTERNAL_API_SECRET;
  if (!backendUrl || !internalKey) return [];

  try {
    const response = await fetch(
      `${backendUrl}/api/payments/records?customerEmail=${encodeURIComponent(email)}`,
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
          : 'Seftly subscription',
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
