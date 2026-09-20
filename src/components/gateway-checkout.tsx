'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronDown, Copy, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const gateways = {
  bkash: {
    name: 'bKash',
    accent: '#e2136e',
    image: '/bkash.jpeg',
    panelStyle: 'solid',
  },
  nagad: {
    name: 'Nagad',
    accent: '#e91429',
    image: '/nagad.jpeg',
  },
  rocket: {
    name: 'Rocket',
    accent: '#8c3494',
    image: '/rocket.jpeg',
  },
} as const;

export default function GatewayCheckout({
  gateway,
  orderId,
  amount,
  customerEmail,
  receiverNumber,
  planId = '',
  packageName = '',
  originalAmount = '',
  discountAmount = '',
  logoUrl,
  brandName = 'payConfirm',
  businessName = 'Your Business',
  businessLogoUrl,
  invoiceNo,
  supportPhone = '09600000000',
  copyrightOwner = 'PayConfirm',
}: {
  gateway: keyof typeof gateways;
  orderId: string;
  amount: string;
  customerEmail: string;
  receiverNumber: string;
  planId?: string;
  packageName?: string;
  originalAmount?: string;
  discountAmount?: string;
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
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const phoneInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const phoneDigits = phone
    .padEnd(11, ' ')
    .slice(0, 11)
    .split('')
    .map((digit) => (digit === ' ' ? '' : digit));

  const isNagad = gateway === 'nagad';
  const isValidPhone = /^01\d{9}$/.test(phone);
  const isValidTrx = trxId.trim().length >= 6;

  function updateNagadDigit(index: number, value: string) {
    const digits = phoneDigits;
    const pastedDigits = value.replace(/\D/g, '').slice(0, 11 - index);
    if (!pastedDigits) {
      digits[index] = '';
      setPhone(digits.join(''));
      return;
    }
    pastedDigits.split('').forEach((digit, offset) => {
      digits[index + offset] = digit;
    });
    const nextPhone = digits.join('').slice(0, 11);
    setPhone(nextPhone);
    const nextIndex = Math.min(index + pastedDigits.length, 10);
    phoneInputRefs.current[nextIndex]?.focus();
  }

  function handleNagadKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === 'Backspace' && !phoneDigits[index] && index > 0) {
      const digits = phoneDigits;
      digits[index - 1] = '';
      setPhone(digits.join('').replace(/\s/g, ''));
      phoneInputRefs.current[index - 1]?.focus();
    }
  }

  function handleNagadPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 11);
    setPhone(pasted);
    phoneInputRefs.current[Math.min(pasted.length, 10)]?.focus();
  }

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
      sender_phone_number: phone,
      customer_email: customerEmail,
      order_id: orderId,
      plan_id: planId,
      package_name: packageName,
      original_amount: originalAmount,
      discount_amount: discountAmount,
    });
    router.push(`/checkout/verify?${query.toString()}`);
  }

  async function copyReceiverNumber() {
    try {
      await navigator.clipboard.writeText(receiverNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError('Could not copy the payment number.');
    }
  }

  function handleConfirmClick() {
    if (step === 1) goToStepTwo();
    else submitFinal();
  }

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden bg-slate-100 px-3 py-2 sm:px-4 sm:py-4">
      <div className="mx-auto max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* Top brand header */}
        <div className="flex items-center justify-center border-b border-slate-100 py-2 sm:py-5">
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
        <div className="flex items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3">
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
          className="px-4 py-2 text-center sm:px-6 sm:py-6"
          style={{ backgroundColor: details.accent }}
        >
          {step === 1 ? (
            <>
              <p className="text-lg font-semibold text-white">
                Your {details.name} account number
              </p>
              {isNagad ? (
                <div
                  className="mt-3 grid w-full grid-cols-11 gap-1 px-0.5 sm:gap-1.5"
                  role="group"
                  aria-label="Your Nagad account number"
                >
                  {phoneDigits.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(element) => {
                        phoneInputRefs.current[index] = element;
                      }}
                      value={digit}
                      onChange={(event) => updateNagadDigit(index, event.target.value)}
                      onKeyDown={(event) => handleNagadKeyDown(index, event)}
                      onPaste={handleNagadPaste}
                      inputMode="numeric"
                      autoFocus={index === 0}
                      maxLength={1}
                      aria-label={`Nagad account digit ${index + 1}`}
                      className="h-11 w-full min-w-0 rounded-lg border-2 border-white bg-white px-0 text-center text-lg font-bold text-slate-900 placeholder:text-slate-400 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white sm:h-12"
                    />
                  ))}
                </div>
              ) : (
                <Input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 11))}
                  placeholder="e.g 01XXXXXXXXX"
                  inputMode="tel"
                  autoFocus
                  maxLength={11}
                  className="mt-3 h-12 rounded-xl border-0 bg-white text-center text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white"
                />
              )}

              {error ? (
                <p className="mt-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}

              <p className="mt-3 text-center text-sm font-medium text-white">
                Confirm and proceed,{' '}
                <a href="/terms" className="underline underline-offset-2">
                  terms &amp; conditions
                </a>
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowHelp((prev) => !prev)}
                aria-expanded={showHelp}
                className="mx-auto flex w-full max-w-sm items-center justify-between gap-2 rounded-xl bg-white/10 px-3 py-2 text-left text-xs font-medium text-white sm:text-sm"
              >
                <span>কিভাবে সেন্ড মানি  করবেন? (দেখুন)</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${showHelp ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {showHelp ? (
                <div className="mx-auto mt-2 max-w-sm">
                  <div className="rounded-xl bg-white/10 px-3 text-left text-xs leading-5 text-white sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                    <p>১. আপনার {details.name} অ্যাপ অথবা USSD ব্যবহার করুন।</p>
                    <p>২. Send Money সিলেক্ট করুন।</p>
                  </div>

                  <div className="mx-auto mt-3 w-full max-w-xs overflow-hidden rounded-xl bg-white p-1.5 shadow-sm sm:max-w-sm sm:p-2">
                    <Image
                      src={details.image}
                      alt={`${details.name} payment instructions`}
                      width={320}
                      height={180}
                      sizes="(max-width: 640px) calc(100vw - 64px), 384px"
                      className="h-auto max-h-20 w-full rounded-lg object-contain sm:max-h-40"
                    />
                  </div>
                </div>
              ) : null}

              <p className="mt-2 text-center text-xs font-medium text-white sm:mt-2 sm:text-sm">
                ৩. অনুগ্রহ করে নিচের নম্বরে সেন্ড মানি করুন।
              </p>

              <div className="mx-auto mt-1.5 flex w-full max-w-sm items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-slate-900 shadow-sm sm:mt-2 sm:gap-3 sm:px-4 sm:py-2.5">
                <div className="min-w-0 text-left">
                  <p className="text-xs font-medium text-slate-500">
                    নিচের নম্বরে সেন্ড মানি করুন
                  </p>
                  <p className="mt-0.5 truncate text-lg font-bold tracking-wide sm:mt-1 sm:text-xl">
                    {receiverNumber}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={copyReceiverNumber}
                  aria-label="Copy payment number"
                  className="h-10 w-10 shrink-0 p-0 text-slate-700 hover:bg-slate-100"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>

              <div className="mx-auto mt-1.5 max-w-sm text-left sm:mt-2">
                <label className="mb-1 block text-xs font-semibold text-white sm:mb-1.5 sm:text-sm">
                  Transaction ID
                </label>
                <Input
                  value={trxId}
                  onChange={(event) =>
                    setTrxId(event.target.value.toUpperCase())
                  }
                  placeholder="আপনার Transaction ID লিখুন"
                  autoFocus
                  className="h-10 rounded-xl border-0 bg-white text-sm text-slate-900 uppercase tracking-wide placeholder:normal-case placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:text-base"
                />
              </div>

              {error ? (
                <p className="mt-2 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  setError('');
                  setStep(1);
                }}
                className="mt-3 text-sm font-medium text-white underline underline-offset-2"
              >
                Change account number
              </button>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-xl border-slate-200 text-slate-700 sm:h-12"
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
            className="h-10 rounded-xl text-white disabled:opacity-40 sm:h-12"
            style={{ backgroundColor: details.accent }}
          >
            {step === 1 ? 'Proceed' : submitting ? 'Verifying…' : 'Verify'}
          </Button>
        </div>

        <div className="border-t border-slate-100 px-3 py-2 text-center sm:px-4 sm:py-3">
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