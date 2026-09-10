'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Copy, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function NagadCheckout({
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
  const [copied, setCopied] = useState(false);
  const normalizedPhone = phone.replace(/\D/g, '');
  const formattedAmount = Number(amount || 0).toLocaleString('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function continueToPayment(event: React.FormEvent) {
    event.preventDefault();
    if (!/^01\d{9}$/.test(normalizedPhone)) {
      setError('Please enter a valid 11-digit Nagad account number.');
      return;
    }
    setError('');
    setStep(2);
  }

  function submitVerification(event: React.FormEvent) {
    event.preventDefault();
    if (trxId.trim().length < 6) {
      setError('Please enter your Nagad transaction ID.');
      return;
    }
    router.push(
      `/checkout/verify?${new URLSearchParams({ trx_id: trxId.trim(), amount, sender_phone_number: normalizedPhone, customer_email: customerEmail, order_id: orderId, plan_id: planId, package_name: packageName, original_amount: originalAmount, discount_amount: discountAmount })}`
    );
  }

  async function copyNumber() {
    await navigator.clipboard.writeText(receiverNumber);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="min-h-screen bg-white px-0 py-0  text-white sm:flex sm:items-center sm:justify-center sm:py-10">
      <section className="relative mx-auto min-h-screen w-full overflow-hidden border-[7px] border-[#292525] bg-[#a20f16] sm:min-h-0 sm:h-192 sm:w-99.25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_49%,#ed1820_0%,#c30e16_42%,#8f0d14_100%)]" />
        <div className="relative flex min-h-[calc(100vh-14px)] flex-col px-4.5 pb-7  pt-4.25 sm:min-h-0 sm:h-full">
          <div className="mt-2 text-center">
            <div className="mx-auto flex h-17 w-22 items-center justify-center text-white/75">
              <ShoppingCart strokeWidth={1.1} className="h-15.5 w-18.75" />
            </div>
            <h1 className="mt-1 text-[20px] font-extrabold leading-none text-[#f5d4d4]">
              Safelty
            </h1>
          </div>

          <div className="mt-3 space-y-3 text-[18px] leading-none">
            <p>
              <strong className="mr-2.5 text-[#f5d4d4]">Invoice No:</strong>
              <span>{orderId || '—'}</span>
            </p>
            <Separator className="my-2 bg-white/30" />
            <Badge className="bg-white/15 text-white hover:bg-white/20">
              Secure manual payment
            </Badge>
            <p>
              <strong className="mr-2 text-[#f5d4d4]">Total Amount:</strong>
              <span>BDT {formattedAmount}</span>
            </p>
            <p>
              <strong className="mr-2.5 text-[#f5d4d4]">Charge:</strong>
              <span>BDT 0</span>
            </p>
          </div>

          {step === 1 ? (
            <form
              onSubmit={continueToPayment}
              className="mt-10 flex flex-1 flex-col items-center"
            >
              <h2 className="text-center text-[18px] font-extrabold text-[#f5d4d4]">
                Your Nagad Account Number
              </h2>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                inputMode="numeric"
                autoComplete="tel"
                aria-label="Your Nagad Account Number"
                className="mt-2.25 h-8 w-full rounded-[5px] border-0 bg-white px-2 text-center text-[20px] font-bold tracking-[5px] text-[#222] outline-none"
                placeholder=""
              />
              {error && (
                <p
                  className="mt-2 text-center text-[12px] font-semibold text-white"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <p className="mt-5 text-center text-[14px] leading-4.25 text-[#f8dddd]">
                By clicking/tapping &quot;Proceed&quot; you are agreeing
                <br />
                to our <strong>Terms and Conditions</strong>
              </p>
              <div className="mt-10.75 flex w-full justify-center gap-19.75">
                <button
                  type="submit"
                  className="h-7.5 w-23.75 rounded-[5px] bg-white text-[16px] font-bold text-[#a20f16]"
                >
                  Proceed
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="h-7.5 w-23.75 rounded-[5px] bg-white text-[16px] font-bold text-[#a20f16]"
                >
                  Close
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={submitVerification}
              className="mt-8 flex flex-1 flex-col items-center"
            >
              <h2 className="text-center text-[18px] font-extrabold text-[#f5d4d4]">
                Send BDT {formattedAmount} to
              </h2>
              <div className="mt-4 flex items-center gap-2 rounded-[5px] bg-white px-3 py-2 text-[#a20f16] shadow-sm">
                <span className="text-[20px] font-bold tracking-[2px]">
                  {receiverNumber}
                </span>
                <Button
                  type="button"
                  onClick={copyNumber}
                  aria-label="Copy receiver number"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-[#a20f16] hover:bg-[#fff2f3]"
                >
                  {copied ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <label className="mt-7 w-full text-center text-[18px] font-extrabold text-[#f5d4d4]">
                Transaction ID
                <Input
                  value={trxId}
                  onChange={(event) => setTrxId(event.target.value)}
                  aria-label="Transaction ID"
                  className="mt-2 h-8 w-full rounded-[5px] border-0 bg-white px-3 text-center text-[18px] uppercase text-[#222] outline-none"
                />
              </label>
              {error && (
                <p
                  className="mt-2 text-center text-[12px] font-semibold text-white"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <div className="mt-8 flex w-full justify-center gap-5">
                <Button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStep(1);
                  }}
                  className="h-7.5 w-23.75 rounded-[5px] bg-white text-[16px] font-bold text-[#a20f16]"
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="h-7.5 w-30 rounded-[5px] bg-white text-[16px] font-bold text-[#a20f16]"
                  variant="outline"
                >
                  Verify
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-col items-center justify-end pt-4">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-12.25 w-12.25 items-center justify-center rounded-full border-[5px] border-white text-[23px] font-black">
                ন
              </div>
              <span className="text-[34px] font-bold leading-none">নগদ</span>
            </div>
            <span className="mt-1 text-[12px] font-semibold">
              বাংলাদেশ ডাক বিভাগের ডিজিটাল লেনদেন
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
