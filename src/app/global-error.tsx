"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw, Home, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log to your error reporting service here
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-red-100" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/25">
            <TriangleAlert className="h-8 w-8 text-white" />
          </div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
          Something went wrong
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
          We hit an unexpected error.
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Our team has been notified. You can try again, or head back to a
          safe page.
        </p>

        {error.digest && (
          <p className="mt-3 inline-block rounded-md bg-slate-100 px-3 py-1 font-mono text-xs text-slate-400">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/25 hover:from-sky-600 hover:to-sky-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            Back to home
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