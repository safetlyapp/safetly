'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2, Clock3, Loader2, XCircle } from 'lucide-react';

export default function VerifyPaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        </main>
      }
    >
      <VerifyPaymentContent />
    </Suspense>
  );
}

function VerifyPaymentContent() {
  const params = useSearchParams();
  const submittedRef = useRef(false);
  const [state, setState] = useState<
    'loading' | 'approved' | 'pending' | 'rejected'
  >('loading');
  const [message, setMessage] = useState('Verifying your payment…');

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const input = Object.fromEntries(
      [
        'trx_id',
        'amount',
        'sender_phone_number',
        'customer_email',
        'order_id',
      ].map((key) => [key, params.get(key) ?? ''])
    );
    for (const key of [
      'plan_id',
      'package_name',
      'original_amount',
      'discount_amount',
    ]) {
      input[key] = params.get(key) ?? '';
    }
    fetch('/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as {
          result?: {
            status?: string;
            reason?: string;
            tracking_number?: string;
          };
          error?: string;
        } | null;
        const status = payload?.result?.status;
        if (response.status === 200 || status === 'approved') {
          window.location.assign(
            `/checkout/success?order_id=${encodeURIComponent(input.order_id)}&customer_email=${encodeURIComponent(input.customer_email)}&tracking_number=${encodeURIComponent(payload?.result?.tracking_number ?? '')}`
          );
          return;
        } else if (
          response.status === 404 ||
          status === 'pending_or_not_found'
        ) {
          setState('pending');
          setMessage(
            'Your payment is being verified. We will update you when the payment is confirmed.'
          );
        } else {
          window.location.assign(
            `/checkout/failure?reason=${encodeURIComponent(payload?.result?.reason ?? payload?.result?.status ?? payload?.error ?? 'Payment could not be verified.')}`
          );
        }
      })
      .catch(() => {
        setState('pending');
        setMessage(
          'Payment verification is temporarily unavailable. We will continue checking your payment.'
        );
      });
  }, [params]);

  const Icon =
    state === 'loading'
      ? Loader2
      : state === 'approved'
        ? CheckCircle2
        : state === 'pending'
          ? Clock3
          : XCircle;
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <Icon
          className={`mx-auto h-16 w-16 ${state === 'approved' ? 'text-emerald-600' : state === 'rejected' ? 'text-red-600' : 'text-orange-500'} ${state === 'loading' ? 'animate-spin' : ''}`}
        />
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          {state === 'approved'
            ? 'Payment successful'
            : state === 'pending'
              ? 'Payment under review'
              : state === 'rejected'
                ? 'Payment not approved'
                : 'Verifying payment'}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{message}</p>
      </div>
    </main>
  );
}
