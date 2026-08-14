import { notFound } from "next/navigation";
import CheckoutContent from "@/components/checkout-content";
import { fetchBackendJson } from "@/lib/backend-api";

export const dynamic = "force-dynamic";

type PricingPlan = {
  id: string;
  planId: string;
  name: string;
  price: string;
  per: string;
  billedNote: string;
  strikeNote: string | null;
  cta: string;
  accentColor: string;
  isPopular: boolean;
  features: string[];
};

type PricingResponse = {
  plans: PricingPlan[];
};

type CheckoutPageProps = {
  searchParams?: Promise<{
    plan?: string | string[];
  }>;
};

function parsePriceAmount(price: string) {
  const amount = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) ? amount : null;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const planParam = resolvedSearchParams.plan;
  const planId = Array.isArray(planParam) ? planParam[0] : planParam;

  const { plans } = await fetchBackendJson<PricingResponse>("/api/pricing");
  const selectedPlan = plans.find((plan) => plan.planId === planId);

  if (!planId || !selectedPlan) {
    notFound();
  }

  const price = parsePriceAmount(selectedPlan.price);
  if (price === null) {
    notFound();
  }

  return (
    <CheckoutContent
      plan={{
        planId: selectedPlan.planId,
        name: selectedPlan.name,
        billing: selectedPlan.billedNote,
        price,
      }}
    />
  );
}
