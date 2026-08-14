"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type ReviewItem = {
  quote: string;
  name: string;
  reviewDate: string;
  initials: string;
};

const AUTOPLAY_MS = 5000;

type ReviewsProps = {
  reviews: ReviewItem[];
};

export default function Reviews({ reviews }: ReviewsProps) {
  // 1 card per slide on mobile, 3 per slide on desktop (md and up)
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = () => setPerPage(mql.matches ? 3 : 1);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const pages = useMemo(() => {
    const chunks: ReviewItem[][] = [];
    for (let i = 0; i < reviews.length; i += perPage) {
      chunks.push(reviews.slice(i, i + perPage));
    }
    return chunks;
  }, [perPage, reviews]);

  const hasMultiplePages = pages.length > 1;

  const track = useMemo(
    () => (hasMultiplePages ? [...pages, pages[0]] : pages),
    [pages, hasMultiplePages]
  );

  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // reset slider position whenever the layout (perPage) changes,
  // so we don't end up mid-track with a stale index
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIndex(0);
      setWithTransition(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [perPage]);

  const activeDot = pages.length > 0 ? index % pages.length : 0;

  useEffect(() => {
    if (paused || !hasMultiplePages) return;
    const id = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, hasMultiplePages]);

  useEffect(() => {
    if (!hasMultiplePages) return;
    if (index === track.length - 1) {
      resetTimeout.current = setTimeout(() => {
        setWithTransition(false);
        setIndex(0);
      }, 500);
    }
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    };
  }, [index, hasMultiplePages, track.length]);

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  const goNext = () => setIndex((prev) => prev + 1);
  const goPrev = () =>
    setIndex((prev) => (prev === 0 ? Math.max(pages.length - 1, 0) : prev - 1));
  const goTo = (i: number) => setIndex(i);

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

      {/* Slider — 1 card per slide on mobile, 3 per slide on desktop */}
      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex",
              withTransition && "transition-transform duration-500 ease-in-out"
            )}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {track.map((group, i) => (
              <div
                key={i}
                className="grid w-full shrink-0 grid-cols-1 gap-6 px-1 md:grid-cols-3"
              >
                {group.map((review) => (
                  <div
                    key={`${review.name}-${review.reviewDate}`}
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
                        <p className="text-xs text-slate-400">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </p>
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
              onClick={goPrev}
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 shadow-md transition hover:-translate-x-5 hover:shadow-lg sm:flex"
            >
              <ChevronLeft className="h-4 w-4 text-slate-700" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white p-2 shadow-md transition hover:translate-x-5 hover:shadow-lg sm:flex"
            >
              <ChevronRight className="h-4 w-4 text-slate-700" />
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeDot ? "w-6 bg-violet-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
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
          className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md"
        >
          Submit you review here
        </Link>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
