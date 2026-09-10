'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const gateway = { name: 'bKash', accent: '#e2136e' };

export default function BkashCheckout({
  orderId,
  amount,
  customerEmail,
  receiverNumber,
  planId,
  packageName,
  originalAmount,
  discountAmount,
}: {
  orderId: string;
  amount: string;
  customerEmail: string;
  receiverNumber: string;
  planId: string;
  packageName: string;
  originalAmount: string;
  discountAmount: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isValidPhone = /^01\d{9}$/.test(phone.replace(/\s/g, ''));
  const isValidTrx = trxId.trim().length >= 6;
  const formattedAmount = Number(amount || 0).toLocaleString('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function goToStepTwo() {
    if (!isValidPhone)
      return setError('Enter a valid 11-digit bKash account number.');
    setError('');
    setStep(2);
  }

  function submitFinal() {
    if (!isValidTrx)
      return setError('Enter the transaction ID from your bKash payment.');
    setError('');
    setSubmitting(true);
    const query = new URLSearchParams({
      trx_id: trxId.trim(),
      amount,
      sender_phone_number: phone.replace(/\s/g, ''),
      customer_email: customerEmail,
      order_id: orderId,
      plan_id: planId,
      package_name: packageName,
      original_amount: originalAmount,
      discount_amount: discountAmount,
    });
    router.push(`/checkout/verify?${query.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-center border-b border-slate-100 py-6">
          <span
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: gateway.accent }}
          >
            bKash
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">Safetly</p>
            <p className="truncate text-xs text-slate-400">
              Invoice: {orderId || '—'}
            </p>
          </div>
          <p className="whitespace-nowrap text-2xl font-bold text-slate-900">
            ৳{formattedAmount}
          </p>
        </div>
        <div
          className="px-6 py-10 text-center"
          style={{ backgroundColor: gateway.accent }}
        >
          {step === 1 ? (
            <>
              <p className="text-lg font-semibold text-white">
                Your bKash account number
              </p>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="e.g. 01XXXXXXXXX"
                inputMode="tel"
                autoFocus
                className="mt-5 h-12 rounded-xl border-0 bg-white text-center text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white"
              />
              {error ? (
                <p className="mt-4 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}
              <p className="mt-5 text-sm font-medium text-white">
                Confirm and proceed to payment.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-white/90">
                Send ৳{formattedAmount} to this bKash number
              </p>
              <p className="mt-1 text-2xl font-bold tracking-wide text-white">
                {receiverNumber}
              </p>
              <Input
                value={trxId}
                onChange={(event) => setTrxId(event.target.value.toUpperCase())}
                placeholder="Transaction ID"
                autoFocus
                className="mt-6 h-12 rounded-xl border-0 bg-white text-slate-900 uppercase tracking-wide placeholder:normal-case placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white"
              />
              {error ? (
                <p className="mt-4 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setStep(1);
                }}
                className="mt-5 text-sm font-medium text-white underline underline-offset-2"
              >
                Change account number
              </button>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 p-4">
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-xl"
            onClick={() => (step === 1 ? router.back() : setStep(1))}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            type="button"
            disabled={
              (step === 1 && !isValidPhone) ||
              (step === 2 && (!isValidTrx || submitting))
            }
            onClick={step === 1 ? goToStepTwo : submitFinal}
            className="h-12 rounded-xl text-white disabled:opacity-40"
            style={{ backgroundColor: gateway.accent }}
          >
            {step === 1 ? 'Confirm' : submitting ? 'Verifying…' : 'Confirm'}
          </Button>
        </div>
        <div className="border-t border-slate-100 px-4 py-4 text-center">
          <p
            className="flex items-center justify-center gap-1.5 text-sm font-medium"
            style={{ color: gateway.accent }}
          >
            <Phone className="h-3.5 w-3.5" /> 09600000000
          </p>
          <p className="mt-1 text-xs text-slate-400">
            © {new Date().getFullYear()} Safetly, All Rights Reserved
          </p>
        </div>
      </div>
    </main>
  );
}
