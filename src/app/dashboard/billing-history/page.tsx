'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, Receipt } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Payment = {
  orderId: string;
  transactionId: string;
  packageName: string;
  originalAmount: number | null;
  discountAmount: number | null;
  submittedAmount: number;
  verifiedAmount: number | null;
  status: string;
  paidAt: string;
};

export default function BillingHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = window.localStorage.getItem('Seftly-account');
    if (!raw) {
      setLoading(false);
      return;
    }
    const account = JSON.parse(raw) as { role?: string; identifier?: string };
    const token = window.localStorage.getItem('Seftly-token') ?? '';
    fetch(
      `/api/dashboard?role=${account.role}&identifier=${encodeURIComponent(account.identifier ?? '')}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    )
      .then((response) => response.json())
      .then((data) => setPayments(data.paymentHistory ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-4 gap-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
        </Button>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-orange-500" /> Billing History
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {payments.length} payment{payments.length === 1 ? '' : 's'}
            </span>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Loading payment history…
              </p>
            ) : payments.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No payment records found.
              </p>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.orderId}
                    className="grid gap-4 rounded-xl border p-4 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-center"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {payment.packageName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.orderId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleString()
                          : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Original / discount
                      </p>
                      <p className="font-medium">
                        ৳
                        {(
                          payment.originalAmount ?? payment.submittedAmount
                        ).toFixed(2)}{' '}
                        / ৳{(payment.discountAmount ?? 0).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Charged</p>
                      <p className="font-semibold">
                        ৳
                        {(
                          payment.verifiedAmount ?? payment.submittedAmount
                        ).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        TRX: {payment.transactionId}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`capitalize ${payment.status === 'approved' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : ''}`}
                    >
                      {payment.status.replaceAll('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
