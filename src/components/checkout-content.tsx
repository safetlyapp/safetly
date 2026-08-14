"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Tag,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PaymentMethodId = "bkash" | "nagad" | "rocket";

const COUPONS: Record<string, number> = {
  SAFE10: 10,
  WELCOME15: 15,
};

const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  logo: string;
  color: string;
  bg: string;
}[] = [
  { id: "bkash", label: "bKash", logo: "/bKash.png", color: "#E2136E", bg: "#FDF2F8" },
  { id: "nagad", label: "Nagad", logo: "/Nagad.png", color: "#F42B4E", bg: "#FEF1F3" },
  { id: "rocket", label: "Rocket", logo: "/rocket.png", color: "#8C3494", bg: "#F6F0FA" },
];

type CheckoutPlan = {
  planId: string;
  name: string;
  billing: string;
  price: number;
};

type CheckoutContentProps = {
  plan: CheckoutPlan;
};

export default function CheckoutContent({ plan }: CheckoutContentProps) {
  const [agreed, setAgreed] = useState(false);
  const [accountId, setAccountId] = useState("");

  const [logoErrors, setLogoErrors] = useState<Record<PaymentMethodId, boolean>>({
    bkash: false,
    nagad: false,
    rocket: false,
  });

  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [discountPercent, setDiscountPercent] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const discountAmount = useMemo(
    () => Math.round(plan.price * discountPercent) / 100,
    [plan.price, discountPercent]
  );
  const total = useMemo(
    () => plan.price - (plan.price * discountPercent) / 100,
    [plan.price, discountPercent]
  );

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setDiscountPercent(COUPONS[code]);
      setCouponStatus("valid");
    } else {
      setDiscountPercent(0);
      setCouponStatus("invalid");
    }
  }

  function handlePay() {
    const newErrors: string[] = [];
    if (!accountId.trim()) {
      newErrors.push("Please enter your email, nickname, or kids ID.");
    }
    if (!paymentMethod) {
      newErrors.push("Please select a payment method (bKash, Nagad, or Rocket).");
    }
    if (!agreed) {
      newErrors.push(
        "Please agree to the Terms and Conditions, Privacy Policy, and Refund Policy."
      );
    }
    setErrors(newErrors);

    if (newErrors.length === 0) {
      console.log("Proceeding to payment", { planId: plan.planId, paymentMethod, total });
    }
  }

  const selectedMethod = PAYMENT_METHODS.find((method) => method.id === paymentMethod);

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-xl font-bold text-slate-900">Checkout</h1>

        <Card className="overflow-hidden rounded-2xl border-slate-200 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
            <div className="bg-slate-50 p-6 md:border-r md:border-slate-200">
              <div className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-700">
                <CreditCard className="h-4 w-4" />
                Order summary
              </div>

              <div className="mb-4 flex flex-row items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">{plan.name}</p>
                  <p className="text-xs text-slate-500">{plan.billing}</p>
                </div>
                <div>
                  <span className="font-medium">৳{plan.price.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="mb-4">
                <Label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <Tag className="h-3.5 w-3.5" />
                  Have a coupon?
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponStatus("idle");
                    }}
                    className="h-9 text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={applyCoupon}
                    className="h-9 shrink-0 px-3 text-xs"
                  >
                    Apply
                  </Button>
                </div>

                {couponStatus === "valid" && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Coupon applied - {discountPercent}% off
                  </p>
                )}
                {couponStatus === "invalid" && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-destructive">
                    <XCircle className="h-3.5 w-3.5" />
                    Invalid coupon code
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              {discountPercent > 0 && (
                <div className="mt-2 flex items-center justify-between text-sm text-success">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-৳{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="mt-2 flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Order&apos;s total</span>
                <span>৳{total.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                Secure checkout, cancel anytime
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="mb-1 text-sm font-semibold text-slate-900">
                    1. Account details
                  </h2>
                  <p className="mb-3 text-xs text-slate-500">
                    Enter a valid email address, nickname, or kid&apos;s ID{" "}
                    <span className="text-[11px]">
                      (which you received after installing the kid&apos;s app)
                    </span>
                    .
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

                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {PAYMENT_METHODS.map((method) => {
                      const isSelected = paymentMethod === method.id;
                      const logoFailed = logoErrors[method.id];

                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          aria-label={method.label}
                          style={
                            isSelected
                              ? {
                                  borderColor: method.color,
                                  backgroundColor: method.bg,
                                }
                              : undefined
                          }
                          className={cn(
                            "flex h-14 items-center justify-center rounded-md border px-2 py-2 transition-all duration-200",
                            isSelected
                              ? "shadow-sm"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          )}
                        >
                          {logoFailed ? (
                            <span
                              className="text-sm font-semibold"
                              style={{ color: isSelected ? method.color : "#94A3B8" }}
                            >
                              {method.label}
                            </span>
                          ) : (
                            <Image
                              src={method.logo}
                              alt={method.label}
                              width={100}
                              height={52}
                              className={cn(
                                "h-10 w-auto object-contain transition-opacity",
                                !isSelected && "opacity-50"
                              )}
                              onError={() =>
                                setLogoErrors((prev) => ({
                                  ...prev,
                                  [method.id]: true,
                                }))
                              }
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedMethod && (
                    <p
                      className="mb-4 rounded-md px-3 py-2 text-xs font-medium"
                      style={{
                        backgroundColor: selectedMethod.bg,
                        color: selectedMethod.color,
                      }}
                    >
                      You&apos;re paying via {selectedMethod.label}
                    </p>
                  )}

                  <div className="mb-4 flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(value) => setAgreed(Boolean(value))}
                      className="mt-0.5 shrink-0"
                    />
                    <Label
                      htmlFor="terms"
                      className="whitespace-nowrap overflow-x-auto text-xs font-normal leading-relaxed text-slate-600"
                    >
                      I have read and agree to the{" "}
                      <a href="/policy/terms-of-service" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>
                      ,{" "}
                      <a href="/policy/privacy-policy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="/policy/payment-and-refund-policy"
                        className="text-blue-600 hover:underline"
                      >
                        Refund Policy
                      </a>
                      .
                    </Label>
                  </div>

                  <Button
                    onClick={handlePay}
                    style={
                      selectedMethod
                        ? { backgroundColor: selectedMethod.color }
                        : undefined
                    }
                    className={cn(
                      "w-full gap-2 text-white transition-all duration-200 hover:opacity-90",
                      !selectedMethod && "bg-primary hover:bg-primary/90"
                    )}
                  >
                    Pay {selectedMethod ? `with ${selectedMethod.label}` : "Now"}{" "}
                    (৳{total.toFixed(2)})
                  </Button>

                  {errors.length > 0 && (
                    <div className="mt-3 space-y-1.5 rounded-md border border-destructive/20 bg-destructive/5 p-3">
                      {errors.map((err) => (
                        <p
                          key={err}
                          className="flex items-start gap-1.5 text-xs text-destructive"
                        >
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          {err}
                        </p>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Click &quot;Pay&quot; to complete your subscription. You&apos;ll
                    be redirected to your selected payment provider and then
                    return to this page.
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
