import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

type FaqItem = {
  q: string;
  a: string;
};

type FAQProps = {
  items: FaqItem[];
};

function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Can&apos;t find what you&apos;re looking for? Reach out to our support team anytime.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {items.map((item, i) => (
          <details
            key={`${item.q}-${i}`}
            className="group overflow-hidden rounded-xl bg-slate-50 shadow-sm"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-4 text-left [&::-webkit-details-marker]:hidden">
              <span
                className="text-sm font-medium text-slate-900 md:text-base"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(item.q),
                }}
              />
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 transition-transform duration-300 group-open:rotate-45">
                <Plus className="h-4 w-4" />
              </span>
            </summary>

            <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(item.a),
                }}
              />
            </div>
          </details>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          href="/faq"
          className="group flex items-center gap-1.5 text-sm font-medium text-violet-700 transition-colors hover:text-violet-800"
        >
          See more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
