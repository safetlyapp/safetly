'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const gateways = {
  bkash: {
    name: 'bKash',
    accent: '#e2136e',
    panelStyle: 'solid',
  },
  nagad: {
    name: 'Nagad',
    accent: '#e91429',
    panelStyle: 'gradient',
  },
  rocket: {
    name: 'Rocket',
    accent: '#8c3494',
    panelStyle: 'solid',
  },
} as const;

export default function GatewayCheckout({
  gateway,
  orderId,
  amount,
  customerEmail,
  receiverNumber,
  logoUrl,
  brandName = 'PayGate',
  businessName = 'Your Business',
  businessLogoUrl,
  invoiceNo,
  supportPhone = '09600000000',
  copyrightOwner = 'PayGate',
}: {
  gateway: keyof typeof gateways;
  orderId: string;
  amount: string;
  customerEmail: string;
  receiverNumber: string;
  logoUrl?: string;
  brandName?: string;
  businessName?: string;
  businessLogoUrl?: string;
  invoiceNo?: string;
  supportPhone?: string;
  copyrightOwner?: string;
}) {
  const router = useRouter();
  const details = gateways[gateway];

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValidPhone = /^01\d{9}$/.test(phone.replace(/\s/g, ''));
  const isValidTrx = trxId.trim().length >= 6;

  function goToStepTwo() {
    if (!isValidPhone)
      return setError('Enter a valid 11-digit account number.');
    setError('');
    setStep(2);
  }

  function submitFinal() {
    if (!isValidTrx)
      return setError('Enter the transaction ID from your payment.');
    setError('');
    setSubmitting(true);
    const query = new URLSearchParams({
      trx_id: trxId.trim(),
      amount,
      sender_phone_number: phone.replace(/\s/g, ''),
      customer_email: customerEmail,
      order_id: orderId,
    });
    router.push(`/checkout/verify?${query.toString()}`);
  }

  function handleConfirmClick() {
    if (step === 1) goToStepTwo();
    else submitFinal();
  }

  const panelBackground =
    details.panelStyle === 'gradient'
      ? `linear-gradient(180deg, ${details.accent} 0%, #b8001f 100%)`
      : details.accent;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Top brand header */}
        <div className="flex items-center justify-center border-b border-slate-100 py-6">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={brandName} className="h-9" />
          ) : (
            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: details.accent }}
            >
              {brandName}
            </span>
          )}
        </div>

        {/* Order summary */}
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            {businessLogoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={businessLogoUrl}
                alt={businessName}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500">
                {businessName.slice(0, 1)}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {businessName}
              </p>
              <p className="truncate text-xs text-slate-400">
                Inv No: {invoiceNo ?? orderId}
              </p>
            </div>
          </div>
          <p className="whitespace-nowrap text-2xl font-bold text-slate-900">
            ৳{Number(amount || 0).toFixed(2)}
          </p>
        </div>

        {/* Colored panel — step switches inside here, styled per gateway */}
        <div
          className="px-6 py-10 text-center"
          style={{ background: panelBackground }}
        >
          {step === 1 ? (
            <>
              <p className="text-lg font-semibold text-white">
                Your {details.name} account number
              </p>
              <div className="relative mt-5">
                <Input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="e.g 01XXXXXXXXX"
                  inputMode="tel"
                  autoFocus
                  className="h-12 rounded-xl border-0 bg-white text-center text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white"
                />
              </div>

              {error ? (
                <p className="mt-4 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}

              <p className="mt-5 text-center text-sm font-medium text-white">
                Confirm and proceed,{' '}
                <a href="/terms" className="underline underline-offset-2">
                  terms &amp; conditions
                </a>
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-white/90">
                Send ৳{Number(amount || 0).toFixed(2)} to this {details.name}{' '}
                number
              </p>
              <p className="mt-1 text-2xl font-bold tracking-wide text-white">
                {receiverNumber}
              </p>

              <div className="mt-6 text-left">
                <Input
                  value={trxId}
                  onChange={(event) =>
                    setTrxId(event.target.value.toUpperCase())
                  }
                  placeholder="Transaction ID"
                  autoFocus
                  className="h-12 rounded-xl border-0 bg-white text-slate-900 uppercase tracking-wide placeholder:normal-case placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white"
                />
              </div>

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

        {/* Footer actions */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-xl border-slate-200 text-slate-700"
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
            onClick={handleConfirmClick}
            className="h-12 rounded-xl text-white disabled:opacity-40"
            style={{ backgroundColor: details.accent }}
          >
            {step === 1 ? 'Confirm' : submitting ? 'Verifying…' : 'Confirm'}
          </Button>
        </div>

        <div className="border-t border-slate-100 px-4 py-4 text-center">
          <p
            className="flex items-center justify-center gap-1.5 text-sm font-medium"
            style={{ color: details.accent }}
          >
            <Phone className="h-3.5 w-3.5" /> {supportPhone}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            © {new Date().getFullYear()} {copyrightOwner}, All Rights Reserved
          </p>
        </div>
      </div>
    </main>
  );
}
