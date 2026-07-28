import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Monthly/30-Day",
    price: "৳99",
    per: "/mo.",
    billedNote: "*Billed monthly at ৳99",
    cta: "Subscribe for 30 days",
    features: [
      "1-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
    highlighted: false,
  },
  {
    name: "Quarterly/90-Day",
    price: "৳91.66",
    per: "/mo.",
    billedNote: "*Billed quarterly at ৳275",
    strikeNote: "৳297",
    cta: "Subscribe for 90 days",
    features: [
      "3-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
    highlighted: false,
  },
  {
    name: "Quarterly/180-Day",
    price: "৳90",
    per: "/mo.",
    billedNote: "*Billed quarterly at ৳540",
    strikeNote: "৳594",
    cta: "Subscribe for 90 days",
    features: [
      "6-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
    highlighted: true,
  },
  {
    name: "Quarterly/360-Day",
    price: "৳87.5",
    per: "/mo.",
    billedNote: "*Billed quarterly at ৳1,050",
    strikeNote: "৳1,188",
    cta: "Subscribe for 90 days",
    features: [
      "12-month access to all features",
      "No auto-renew",
      "One device tracking",
      "All upcoming premium features.",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section  id="pricing" className="relative overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300" />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-medium text-violet-600">Pricing Plans</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Choose the Best Plan for You
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Basic protection like harmful site blocking and Safe Search is free
          for everyone! But upgrade to Premium today for full control,
          including parental control, app blockers, and focus tools.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col",
                plan.highlighted
                  ? "border-violet-600 bg-violet-600 text-white shadow-lg"
                  : "border-slate-200"
              )}
            >
              <CardContent className="flex flex-1 flex-col p-6">
                <h3
                  className={cn(
                    "text-base font-semibold",
                    plan.highlighted ? "text-white" : "text-slate-900"
                  )}
                >
                  {plan.name}
                </h3>

                <p className="mt-2">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlighted ? "text-violet-100" : "text-slate-500"
                    )}
                  >
                    {plan.per}
                  </span>
                </p>

                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.highlighted ? "text-violet-100" : "text-slate-500"
                  )}
                >
                  {plan.billedNote}
                  {plan.strikeNote && (
                    <span className="ml-1 line-through opacity-70">
                      {plan.strikeNote}
                    </span>
                  )}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      <span
                        className={
                          plan.highlighted ? "text-white" : "text-slate-700"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-6 gap-2",
                    plan.highlighted
                      ? "bg-white text-violet-700 hover:bg-violet-50"
                      : "bg-violet-600 hover:bg-violet-700"
                  )}
                >
                  <Award className="h-4 w-4" />
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}