"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

const PLAN = {
  name: "AirDroid Parental Control",
  billing: "Monthly",
  price: 9.99,
};

export default function CheckoutPage() {
  const [agreed, setAgreed] = useState(false);
  const [accountId, setAccountId] = useState("");

  const canPay = agreed && accountId.trim().length > 0;

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-xl font-semibold text-slate-900">Checkout</h1>

        <Card className="overflow-hidden border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
            {/* Order summary */}
            <div className="bg-slate-50 p-6 md:border-r md:border-slate-200">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
                <CreditCard className="h-4 w-4" />
                Order summary
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-slate-900">{PLAN.name}</p>
                <p className="text-xs text-slate-500">{PLAN.billing}</p>
              </div>

              <Separator className="my-4" />

              <button className="mb-4 text-sm text-slate-500 hover:text-slate-700">
                I have a coupon
              </button>

              <Separator className="my-4" />

              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>${PLAN.price.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Order&apos;s total</span>
                <span>${PLAN.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment details */}
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-1 text-sm font-semibold text-slate-900">
                    1. Account details
                  </h2>
                  <p className="mb-3 text-xs text-slate-500">
                    Enter a valid email address, Nickname or kids ID (that you provided
                    when creating the account).
                  </p>
                  <Input
                    placeholder="Email, Nickname or kids ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                  />
                </div>

                <div>
                  <h2 className="mb-3 text-sm font-semibold text-slate-900">
                    2. Payment details
                  </h2>

                  <div className="mb-4 flex items-center gap-2 rounded-md border border-pink-200 bg-pink-50 px-3 py-2.5">
                    <BkashLogo className="h-5 w-auto" />
                  </div>

                  <div className="mb-4 flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(v) => setAgreed(Boolean(v))}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms" className="text-xs font-normal leading-snug text-slate-600">
                      I have read and agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>
                      ,{" "}
                      <a href="/terms" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>
                      , and{" "}
                      <a href="/terms" className="text-blue-600 hover:underline">
                        Refund Policy
                      </a>
                      .
                    </Label>
                  </div>

                  <Button
                    disabled={!canPay}
                    className="w-full gap-2 bg-pink-600 hover:bg-pink-700 disabled:bg-slate-300"
                  >
                    <BkashLogo className="h-4 w-auto invert brightness-0 grayscale" />
                    Pay with bKash (Monthly)
                  </Button>

                  <p className="mt-3 text-xs leading-snug text-slate-500">
                    Click &quot;Pay with bKash&quot; to pay via bKash. You&apos;ll be
                    redirected to bKash to complete the payment and then return to
                    this page.
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

function BkashLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" className={className} aria-hidden="true">
      <text x="0" y="22" fontSize="20" fontWeight={700} fill="#E2136E">
        bKash
      </text>
    </svg>
  );
}