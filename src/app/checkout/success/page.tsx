'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const [seconds, setSeconds] = useState(5);
  const orderId = params.get('order_id') ?? '';
  const email = params.get('customer_email') ?? '';
  const trackingNumber = params.get('tracking_number') ?? '';

  useEffect(() => {
    const interval = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000
    );
    const timeout = window.setTimeout(() => {
      window.location.assign(`/dashboard`);
    }, 5000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [orderId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden border-emerald-200 shadow-xl">
        <CardHeader className="items-center border-b bg-emerald-50/70 pb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
            ✓
          </div>
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
            Payment approved
          </Badge>
          <CardTitle className="mt-3 text-2xl">Payment successful</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6 text-center">
          <p className="mt-3 text-sm text-slate-600">
            Your plan has been activated successfully.
          </p>
          <div className="rounded-xl border bg-muted/30 p-4 text-left text-sm">
            <p className="text-slate-500">Tracking number</p>
            <p className="mt-1 font-semibold text-slate-900">
              {trackingNumber || 'Unavailable'}
            </p>
            {orderId ? (
              <>
                <Separator className="my-3" />
                <p className="text-xs text-muted-foreground">
                  Order ID: {orderId}
                </p>
              </>
            ) : null}
            {email ? (
              <>
                <Separator className="my-3" />
                <p className="text-xs text-muted-foreground">
                  Confirmation sent to {email}
                </p>
              </>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            Opening your dashboard in {seconds} seconds…
          </p>
          <Button asChild className="w-full">
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
