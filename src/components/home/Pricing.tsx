"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Award, Sparkles, ShieldCheck, Lock, ReceiptText } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly/30-Day",
    price: "৳99",
    per: "/mo.",
    billedNote: "*Billed monthly at ৳99",
    cta: "Subscribe for 30 days",
    accent: "#F16521",
    popular: false,
    features: [
      "1-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly/90-Day",
    price: "৳91.66",
    per: "/mo.",
    billedNote: "*Billed quarterly at ৳275",
    strikeNote: "৳297",
    cta: "Subscribe for 90 days",
    accent: "#00A14B",
    popular: true,
    features: [
      "3-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
  },
  {
    id: "half-yearly",
    name: "Half-Yearly/180-Day",
    price: "৳90",
    per: "/mo.",
    billedNote: "*Billed half-yearly at ৳540",
    strikeNote: "৳594",
    cta: "Subscribe for 180 days",
    accent: "#7E3F98",
    popular: false,
    features: [
      "6-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
  },
  {
    id: "yearly",
    name: "Yearly/360-Day",
    price: "৳87.5",
    per: "/mo.",
    billedNote: "*Billed yearly at ৳1,050",
    strikeNote: "৳1,188",
    cta: "Subscribe for 360 days",
    accent: "#F16521",
    popular: false,
    features: [
      "12-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Money Back Guarantee" },
  { icon: Lock, label: "Secure Online Payment" },
  { icon: ReceiptText, label: "VAT Included in All Prices" },
];

export default function Pricing() {
  const router = useRouter();
  // Default selected: 360-Day
  const [selectedId, setSelectedId] = useState("quarterly");

  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-medium text-secondary">Pricing Plans</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Choose the Best Plan for You
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Basic protection like harmful site blocking and Safe Search is free
          for everyone! But upgrade to Premium today for full control,
          including parental control, app blockers, and focus tools.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => {
            const isSelected = selectedId === plan.id;

            return (
              <Card
                key={plan.id}
                onClick={() => setSelectedId(plan.id)}
                style={
                  isSelected
                    ? {
                        borderColor: plan.accent,
                        backgroundColor: `${plan.accent}0D`,
                        boxShadow: `0 10px 25px -5px ${plan.accent}26`,
                      }
                    : undefined
                }
                className={cn(
                  "relative flex cursor-pointer flex-col overflow-visible transition-all duration-300",
                  isSelected
                    ? "border-2 -translate-y-1"
                    : "border-slate-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
                )}
              >
                {plan.popular && (
                  <span
                    style={{
                      backgroundColor: isSelected ? plan.accent : "#94A3B8",
                    }}
                    className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm transition-colors duration-300"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </span>
                )}

                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-semibold text-slate-900">
                    {plan.name}
                  </h3>

                  <p className="mt-2">
                    <span
                      className="text-2xl font-bold transition-colors duration-300"
                      style={{ color: isSelected ? plan.accent : "#0F172A" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-slate-500">{plan.per}</span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {plan.billedNote}
                    {plan.strikeNote && (
                      <span className="ml-1 line-through opacity-70">
                        {plan.strikeNote}
                      </span>
                    )}
                  </p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{
                            color: isSelected ? plan.accent : "#22C55E",
                          }}
                        />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(plan.id);
                      router.push(`/checkout?plan=${plan.id}`);
                    }}
                    style={
                      isSelected
                        ? { backgroundColor: plan.accent, color: "#fff" }
                        : undefined
                    }
                    className={cn(
                      "mt-6 gap-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
                      isSelected
                        ? "hover:opacity-90"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    <Award className="h-4 w-4" />
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:gap-8">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <Icon className="h-4 w-4 text-success" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}