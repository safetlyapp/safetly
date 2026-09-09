'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CheckoutFailurePage() {
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    const interval = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000
    );
    const timeout = window.setTimeout(
      () => window.location.assign('/checkout'),
      5000
    );
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
          ×
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Payment failed
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          We could not approve this payment. Please try again.
        </p>
        <p className="mt-6 text-sm text-slate-500">
          Returning to checkout in {seconds} seconds…
        </p>
        <Link
          href="/checkout"
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Return now
        </Link>
      </div>
    </main>
  );
}
