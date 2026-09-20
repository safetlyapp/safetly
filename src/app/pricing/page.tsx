import Pricing from '@/components/home/Pricing';
import { fetchBackendJson } from '@/lib/backend-api';
import React from 'react'


export const dynamic = 'force-dynamic';

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



async function page() {

  const [pricingResponse] =
    await Promise.all([
      fetchBackendJson<PricingResponse>('/api/pricing'),
    ]);
  return (
    <>
      <Pricing plans={pricingResponse.plans} />
    </>
  )
}

export default page