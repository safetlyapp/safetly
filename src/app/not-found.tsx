import Link from "next/link";
import { ShieldCheck, Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg shadow-sky-500/25">
            <SearchX className="h-8 w-8 text-white" />
          </div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
          404 error
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
          This page went off the grid.
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist, may have
          been moved, or the link might be broken.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            Visit FAQ
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          Safetly — Supporting safer digital experiences for families.
        </div>
      </div>
    </div>
  );
}