import FaqContent from "@/components/faq-content";
import { fetchBackendJson } from "@/lib/backend-api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Safetly",
  description:
    "Frequently asked questions about Safetly parental controls, family safety, subscriptions, payments, and privacy.",
};

export const dynamic = "force-dynamic";

type FaqCategoryResponse = {
  id: string;
  title: string;
  displayOrder: number;
  isPublished: boolean;
};

type FaqItemResponse = {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  displayOrder: number;
  isPublished: boolean;
};

type FaqContentCategory = {
  title: string;
  items: { q: string; a: string }[];
};

type FaqCategoriesResponse = {
  categories: FaqCategoryResponse[];
};

type FaqItemsResponse = {
  items: FaqItemResponse[];
};

export default async function FaqPage() {
  const [categoriesResponse, itemsResponse] = await Promise.all([
    fetchBackendJson<FaqCategoriesResponse>("/api/faq/categories"),
    fetchBackendJson<FaqItemsResponse>("/api/faq/items"),
  ]);

  const categoriesById = new Map<string, FaqContentCategory>();
  for (const category of categoriesResponse.categories) {
    categoriesById.set(category.id, { title: category.title, items: [] });
  }

  for (const item of itemsResponse.items) {
    const category = categoriesById.get(item.categoryId);
    if (!category) continue;

    category.items.push({
      q: item.question,
      a: item.answer,
    });
  }

  const categories = categoriesResponse.categories
    .map((category) => categoriesById.get(category.id))
    .filter((category): category is FaqContentCategory => Boolean(category));

  return <FaqContent categories={categories} />;
}
