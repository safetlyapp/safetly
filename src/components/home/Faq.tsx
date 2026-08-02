"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "What is Safetly and how does it work?",
    a: "Safetly is a digital wellbeing app that filters harmful content, blurs distracting media, and helps you set healthy screen time limits — all running quietly in the background once installed.",
  },
  {
    q: "Is Safetly free to use?",
    a: "Yes, Safetly has a free plan with core protection features. Upgrading to Premium unlocks advanced tools like Social Media Blur, App Blocker, and detailed activity reports.",
  },
  {
    q: "Which devices and platforms are supported?",
    a: "Safetly currently supports Android devices. Support for additional platforms is on our roadmap — follow our updates to know when it launches.",
  },
  {
    q: "Will Safetly see or store my personal data?",
    a: "No. Safetly filters content directly on your device. We don't read your messages or store your browsing history on our servers.",
  },
  {
    q: "Can I cancel my Premium subscription anytime?",
    a: "Yes, you can cancel anytime from Account Settings. You'll keep Premium access until the end of your current billing period.",
  },
  {
    q: "Does Safetly slow down my phone?",
    a: "No. Safetly is built to run efficiently in the background with minimal battery and performance impact.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

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
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl bg-slate-50 shadow-sm"
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-medium text-slate-900 md:text-base">
                  {item.q}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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