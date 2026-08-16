import Faq from "@/components/home/Faq";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowToInstall from "@/components/home/HowToInstall";
import Pricing from "@/components/home/Pricing";
import Reviews from "@/components/home/Reviews";
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

type ReviewItem = {
  quote: string;
  name: string;
  reviewDate: string;
  initials: string;
};

type PricingResponse = {
  plans: PricingPlan[];
};

type ReviewsResponse = {
  reviews: ReviewItem[];
};

type FaqItem = {
  q: string;
  a: string;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

type FaqCategoriesResponse = {
  categories: { id: string; title: string; displayOrder: number; isPublished: boolean }[];
};

type FaqItemsResponse = {
  items: { id: string; categoryId: string; question: string; answer: string; displayOrder: number; isPublished: boolean }[];
};

export default async function HomePage() {
  const [pricingResponse, reviewsResponse, categoriesResponse, itemsResponse] = await Promise.all([
    fetchBackendJson<PricingResponse>("/api/pricing"),
    fetchBackendJson<ReviewsResponse>("/api/reviews"),
    fetchBackendJson<FaqCategoriesResponse>("/api/faq/categories"),
    fetchBackendJson<FaqItemsResponse>("/api/faq/items"),
  ]);

  const categoriesById = new Map<string, FaqCategory>();
  for (const category of categoriesResponse.categories) {
    categoriesById.set(category.id, { title: category.title, items: [] });
  }

  for (const item of itemsResponse.items) {
    const category = categoriesById.get(item.categoryId);
    if (!category) continue;
    category.items.push({ q: item.question, a: item.answer });
  }

  const faqItems = categoriesResponse.categories
    .flatMap((category) => categoriesById.get(category.id)?.items ?? [])
    .slice(0, 6);


  return (
    <>
      <Hero />
      <Features />
      <HowToInstall />

      <Pricing plans={pricingResponse.plans} />
      {/* <Reviews reviews={reviewsResponse.reviews} /> */}
      <Faq items={faqItems} />
    </>
  );
}
