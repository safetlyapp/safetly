'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutFailurePage() {
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = useState(5);
  const reason = searchParams.get('reason') ?? 'Payment could not be verified.';

  const reasonMessage: Record<string, string> = {
    amount_mismatch:
      'The submitted amount does not match the verified transaction amount.',
    sender_mismatch:
      'The sender phone number does not match the payment transaction.',
    invalid_sender: 'The sender phone number is invalid.',
    sender_unverifiable:
      'The sender could not be verified. The payment requires manual review.',
    reversed: 'This payment was reversed or refunded.',
    already_used: 'This transaction has already been used.',
    already_claimed: 'This transaction has already been claimed.',
    pending_or_not_found:
      'The payment is not available yet. Please try again after the SMS arrives.',
  };
  const readableReason = reasonMessage[reason] ?? reason;
  useEffect(() => {
    const interval = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000
    );
    const timeout = window.setTimeout(
      () => window.location.assign('/#pricing'),
      5000
    );
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden border-red-200 shadow-xl">
        <CardHeader className="items-center border-b bg-red-50/70 pb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
            ×
          </div>
          <Badge variant="destructive">Payment rejected</Badge>
          <CardTitle className="mt-3 text-2xl">Payment failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6 text-center">
          <p className="mt-3 text-sm text-slate-600">{readableReason}</p>
          <p className="text-sm text-muted-foreground">
            Returning to checkout in {seconds} seconds…
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/#pricing">Return to pricing</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
