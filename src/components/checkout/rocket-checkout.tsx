'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function RocketCheckout({
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
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [error, setError] = useState('');

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedPhone = phone.replace(/\s/g, '');

    if (!/^01\d{9}$/.test(normalizedPhone)) {
      setError('Enter a valid 11-digit Rocket number.');
      return;
    }

    if (trxId.trim().length < 6) {
      setError('Enter your Rocket transaction ID.');
      return;
    }

    router.push(
      `/checkout/verify?${new URLSearchParams({
        trx_id: trxId.trim(),
        amount,
        sender_phone_number: normalizedPhone,
        customer_email: customerEmail,
        order_id: orderId,
        plan_id: planId,
        package_name: packageName,
        original_amount: originalAmount,
        discount_amount: discountAmount,
      })}`
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-9 text-[#111]">
      <section className="mx-auto w-full max-w-[684px] text-center">
        <header>
          <div className="mx-auto flex h-[94px] max-w-[684px] items-center justify-center border-b-[10px] border-[#0875d1] bg-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-[7px] border-[#0875d1] text-2xl font-bold text-[#0875d1]">
                ◉
              </div>
              <div className="text-left leading-none">
                <div className=" text-[31px] font-bold tracking-[-1.5px]">
                  Dutch-Bangla Bank
                </div>
                <div className="mt-2 text-center text-[17px]">
                  Your Trusted Partner
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-[#0875d1]/20 px-4 py-3">
            <Badge
              variant="outline"
              className="border-[#0875d1] text-[#0875d1]"
            >
              Secure manual payment
            </Badge>
            <span className="text-xs text-slate-500">Order {orderId}</span>
          </div>
          <div className="border-b-[10px] border-[#0875d1] py-1 text-[29px] font-normal text-[#0000c7]">
            DBBL NEXUS GATEWAY
          </div>
        </header>

        <form onSubmit={submit} className="mx-auto max-w-[360px] pt-4">
          <h1 className="text-[18px] font-bold">Mobile Account Information</h1>
          <div className="mt-2 space-y-2 text-[14px]">
            <label className="flex items-center justify-center gap-2">
              <span className="w-[125px] text-right">Mobile Account</span>
              <Input
                aria-label="Mobile Account"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                inputMode="numeric"
                maxLength={11}
                className="h-8 w-[232px] border border-[#777] bg-white px-2  outline-none focus:border-[#0875d1]"
              />
            </label>
            <label className="flex items-center justify-center gap-2">
              <span className="w-[125px] text-right">Transaction ID</span>
              <Input
                aria-label="Transaction ID"
                value={trxId}
                onChange={(event) => setTrxId(event.target.value)}
                className="h-8 w-[232px] border border-[#777] bg-white px-2  uppercase outline-none focus:border-[#0875d1]"
              />
            </label>
          </div>

          <div className="mt-2 space-y-1 text-[14px] leading-5">
            <p>Amount {Number(amount || 0).toFixed(2)}</p>
            <p>Currency BDT</p>
            <p>Description {orderId}</p>
            <p className="mt-2">
              Send payment to Rocket number: <strong>{receiverNumber}</strong>
            </p>
          </div>

          {error && <p className="mt-3  text-sm text-red-700">{error}</p>}

          <Separator className="mx-auto mt-5 max-w-[360px] bg-[#0875d1]/20" />
          <div className="mt-5 flex justify-center gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="gateway-button"
              variant="outline"
            >
              BACK
            </Button>
            <Button
              type="submit"
              className="gateway-button bg-[#0875d1] text-white hover:bg-[#0665ba]"
            >
              SUBMIT
            </Button>
            <Button
              type="reset"
              onClick={() => {
                setPhone('');
                setTrxId('');
                setError('');
              }}
              className="gateway-button"
              variant="outline"
            >
              RESET
            </Button>
          </div>
        </form>

        <footer className="mt-6 border-t-[10px] border-[#0875d1] pt-1 font-mono">
          <p className="text-[17px] font-bold">DBBL E-COMM With PAY CONFIRM</p>
        </footer>
      </section>
    </main>
  );
}
