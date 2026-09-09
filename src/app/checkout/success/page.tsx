'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

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

  useEffect(() => {
    const interval = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000
    );
    const timeout = window.setTimeout(() => {
      window.location.assign(
        `/download?order_id=${encodeURIComponent(orderId)}`
      );
    }, 5000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [orderId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Payment successful
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Your plan has been activated successfully.
        </p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-sm">
          <p className="text-slate-500">Tracking / Order ID</p>
          <p className="mt-1 font-semibold text-slate-900">
            {orderId || 'Unavailable'}
          </p>
          {email ? (
            <p className="mt-2 text-xs text-slate-500">Confirmation: {email}</p>
          ) : null}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Opening your file access in {seconds} seconds…
        </p>
        <Link
          href={`/download?order_id=${encodeURIComponent(orderId)}`}
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Open now
        </Link>
      </div>
    </main>
  );
}
