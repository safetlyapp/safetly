"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Drop your 3 hero photos here (any aspect ratio, but similar works best).
 * Path: /public/images/hero/slide-1.jpg, slide-2.jpg, slide-3.jpg
 */
const SLIDE_IMAGES = [
  "/1.png",
  "/2.png",
  "/3.png",
];

/** Full-bleed background photo behind the whole hero section. */
const BACKGROUND_IMAGE = "/background.jpeg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* top accent bar */}
      <div className="relative z-10 h-1.5 w-full bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300" />

      {/* Full-section background image */}
      <div className="absolute inset-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* light overlay so text stays readable over any photo */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        {/* Copy */}
        <div>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            A safe child means being at peace at all times!
          </h1>
          <p className="mt-4 max-w-md text-slate-600">
            Keep your child away from obscene content, harmful sites, and
            unnecessary scrolling. Activate the Safetly app and keep your
            child&apos;s device 100% secure.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700" >
              <Link href="/checkout">Try it free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-violet-600 text-violet-600 hover:bg-violet-50" >
              <Link href="/pricing">Get Premium</Link>
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            Available on:
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm">
              <AndroidIcon className="h-3.5 w-3.5 text-emerald-600" />
              Android
            </span>
          </p>
        </div>

        {/* Auto-rotating 3-image slot */}
        <div className="flex justify-center md:justify-end">
          <HeroImageCarousel images={SLIDE_IMAGES} intervalMs={8000} />
        </div>
      </div>
    </section>
  );
}

function HeroImageCarousel({
  images,
  intervalMs = 8000,
}: {
  images: string[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="relative h-86 w-64 overflow-hidden rounded-2xl  md:h-96 md:w-72">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`App screenshot ${i + 1}`}
          fill
          className="object-cover transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === active ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.6 9.48 19.44 6.3a.5.5 0 0 0-.86-.5l-1.87 3.23a8.9 8.9 0 0 0-7.42 0L7.42 5.8a.5.5 0 1 0-.86.5l1.85 3.18C5.7 11.13 4 13.9 4 17h16c0-3.1-1.7-5.87-4.4-7.52ZM9 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  );
}