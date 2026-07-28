"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "This is the app that I was looking for to get rid of the addiction of watching Reels and Facebook. Thank you very much for making this great product. I believe it will help people get rid of their phone addiction easily.",
    name: "Tasnim Ahmed Auntik",
    date: "December 19, 2025",
    initials: "TA",
  },
  {
    quote:
      "Superb...really nice initiative from our Muslim community. It is so helpful for using social apps in productive as well as in a safe way.",
    name: "Faiyaz Salafi",
    date: "January 9, 2026",
    initials: "FS",
  },
  {
    quote:
      "I just wanted to say a huge Alhamdulillah for the Safetly app. It's a real struggle sometimes to keep our digital space halal and guard our gaze, but this app has made that journey feel so much lighter and easier for me. I'm truly so grateful for all the heart and hard work you've put into this. Please know that I'll be keeping the whole team in my prayers. May Allah bless you all with success, protect you.",
    name: "Farjana Chowdhury",
    date: "January 08, 2026",
    initials: "FC",
  },
];

const PER_PAGE = 3;
const AUTOPLAY_MS = 5000;

export default function Reviews() {
  // group reviews into pages of 3, so the slider advances a full page
  // at a time instead of one card at a time
  const pages = useMemo(() => {
    const chunks: (typeof REVIEWS)[] = [];
    for (let i = 0; i < REVIEWS.length; i += PER_PAGE) {
      chunks.push(REVIEWS.slice(i, i + PER_PAGE));
    }
    return chunks;
  }, []);

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasMultiplePages = pages.length > 1;

  useEffect(() => {
    if (paused || !hasMultiplePages) return;
    const id = setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, hasMultiplePages, pages.length]);

  const goTo = (i: number) => setPage((i + pages.length) % pages.length);

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Excellent reviews from our app users
          </h2>

          <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2">
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-900">
              4.3
              <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-sm text-slate-600">2.7K reviews</span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-sm font-medium text-slate-900">
              7K+ Downloads
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Based on Playstore</p>
        </div>
      </div>

      {/* Slider — 3 cards visible per page */}
      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((group, pageIndex) => (
              <div
                key={pageIndex}
                className="grid w-full shrink-0 grid-cols-1 gap-6 px-1 md:grid-cols-3"
              >
                {group.map((review) => (
                  <div
                    key={review.name}
                    className="rounded-xl bg-slate-50 p-6 shadow-sm"
                  >
                    <p className="text-sm italic leading-relaxed text-slate-600">
                      &quot;{review.quote}&quot;
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {review.name}
                        </p>
                        <p className="text-xs text-slate-400">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {hasMultiplePages && (
          <>
            <button
              onClick={() => goTo(page - 1)}
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-md hover:bg-slate-50 sm:flex"
            >
              <ChevronLeft className="h-4 w-4 text-slate-700" />
            </button>
            <button
              onClick={() => goTo(page + 1)}
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white p-2 shadow-md hover:bg-slate-50 sm:flex"
            >
              <ChevronRight className="h-4 w-4 text-slate-700" />
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? "w-6 bg-violet-600" : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <p className="text-base font-medium text-slate-900">
          Wanna post your feedback?
        </p>
        <Link
          href="/reviews/submit"
          className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-500"
        >
          Submit you review here
        </Link>
      </div>
    </section>
  );
}