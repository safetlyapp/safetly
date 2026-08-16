"use client";

import { useMemo, useState } from "react";
import { Mail, Plus, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; items: FaqItem[] };

type FaqContentProps = {
  categories: FaqCategory[];
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function FaqContent({ categories }: FaqContentProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.title ?? ""
  );
  const [openKey, setOpenKey] = useState<string | null>(null);

  const resolvedActiveCategory = useMemo(() => {
    if (categories.some((category) => category.title === activeCategory)) {
      return activeCategory;
    }

    return categories[0]?.title ?? "";
  }, [activeCategory, categories]);

  const isSearching = query.trim().length > 0;

  const results = useMemo(() => {
    if (isSearching) {
      const q = query.trim().toLowerCase();
      return categories.flatMap((category) =>
        category.items
          .filter(
            (item) =>
              stripHtml(item.q).toLowerCase().includes(q) ||
              stripHtml(item.a).toLowerCase().includes(q)
          )
          .map((item) => ({ ...item, category: category.title }))
      );
    }

    const category = categories.find(
      (item) => item.title === resolvedActiveCategory
    );
    return (category?.items ?? []).map((item) => ({
      ...item,
      category: category?.title ?? "",
    }));
  }, [categories, isSearching, query, resolvedActiveCategory]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Frequently asked questions
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
          Answers about parental controls, family safety, subscriptions,
          payments, privacy, and more.
        </p>
      </div>

      <div className="relative mx-auto mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 shadow-sm outline-none transition-colors focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {!isSearching && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = category.title === resolvedActiveCategory;

            return (
              <button
                key={category.title}
                onClick={() => {
                  setActiveCategory(category.title);
                  setOpenKey(null);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm",
                  isActive
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {category.title}
              </button>
            );
          })}
        </div>
      )}

      {isSearching && (
        <p className="mt-6 text-center text-sm text-slate-500">
          {results.length} result{results.length !== 1 ? "s" : ""} for
          &quot;{query}&quot;
        </p>
      )}

      <div className="mt-8 space-y-3">
        {results.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-400">
            No questions matched your search. Try a different keyword.
          </p>
        ) : (
          results.map((item, index) => {
            const key = `${item.category}-${index}-${item.q}`;
            const isOpen = openKey === key;

            return (
              <div
                key={key}
                className="overflow-hidden rounded-xl bg-slate-50 shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 px-6 py-4 text-left"
                >
                  <span>
                    {isSearching && (
                      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-violet-500">
                        {item.category}
                      </span>
                    )}
                    <span
                      className="text-sm font-medium text-slate-900 md:text-base"
                    >
                      {stripHtml(item.q)}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                      {stripHtml(item.a)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-50 to-sky-50 px-6 py-10 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Still have questions?
        </h3>
        <p className="max-w-md text-sm text-slate-500">
          Our support team is available to help with anything not covered
          here.
        </p>
        <a
          href="mailto:support@safetly.app"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-md"
        >
          <Mail className="h-4 w-4" />
          support@safetly.app
        </a>
      </div>
    </div>
  );
}
