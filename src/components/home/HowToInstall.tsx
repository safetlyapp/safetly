"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Apple, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HowToInstall() {
  const [audience, setAudience] = useState<"parents" | "kids">("parents");
  const [platform, setPlatform] = useState<"android" | "ios">("android");

  return (
    <section id="download" className="mx-auto max-w-4xl px-4 py-16 text-center">
      {/* Parents / Kids devices */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Download
        </h2>
        <p className="mt-2 text-slate-600">
          Download, install, block harmful websites url or apps and rest
          assured that your kids&apos; devices are safe.
        </p>

        <div className="mx-auto mt-8 flex w-fit rounded-full border border-slate-200 bg-slate-100 p-1.5 shadow-sm">
          <button
            onClick={() => setAudience("parents")}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200",
              audience === "parents"
                ? "border-secondary bg-white text-accent-foreground shadow-sm"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            For Parents&apos; Devices
          </button>
          <button
            onClick={() => setAudience("kids")}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200",
              audience === "kids"
                ? "border-secondary bg-white text-accent-foreground shadow-sm"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            For Kids&apos; Devices
          </button>
        </div>

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-slate-50/60 p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {audience === "parents" ? (
              <>
                <StoreBadge
                  href="/"
                  icon={<PlayStoreIcon className="h-5 w-5" />}
                  line1="GET IT ON"
                  line2="Google Play"
                  size="sm"
                />
                <LockedBadge
                  icon={<Apple className="h-5 w-5" />}
                  line1="Download on the"
                  line2="App Store"
                />
              </>
            ) : (
              <>
                <LockedBadge
                  icon={<PlayStoreIcon className="h-5 w-5" />}
                  line1="GET IT ON"
                  line2="Google Play"
                />
                <LockedBadge
                  icon={<Apple className="h-5 w-5" />}
                  line1="Download on the"
                  line2="App Store"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* section divider */}
      <div className="mx-auto my-16 flex max-w-xs items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
        How to Install
      </h2>
      <p className="mt-2 text-slate-600">
        To install &quot;Safetly app&quot; in your device, Please follow the below link
      </p>

      <div className="mx-auto mt-8 flex w-fit rounded-full border border-slate-200 bg-slate-100 p-1.5 shadow-sm">
        <button
          onClick={() => setPlatform("android")}
          className={cn(
            "flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-200",
            platform === "android"
              ? "border-secondary bg-white text-accent-foreground shadow-sm"
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          <AndroidGlyph className="h-4 w-4" />
          Android
        </button>
        <button
          onClick={() => setPlatform("ios")}
          className={cn(
            "flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-200",
            platform === "ios"
              ? "border-secondary bg-white text-accent-foreground shadow-sm"
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          <Apple className="h-4 w-4" />
          iOS
          <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
            Soon
          </span>
        </button>
      </div>

      {platform === "android" ? (
        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-slate-50/60 p-8 shadow-sm">
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <StoreBadge
              // href="https://play.google.com/store/search?q=parental+control&c=apps"
              href="/"
              icon={<PlayStoreIcon className="h-6 w-6" />}
              line1="GET IT ON"
              line2="Google Play"
            />
            <WatchTutorialButton />
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-slate-200 bg-slate-50/60 p-8 shadow-sm">
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <LockedBadge
              icon={<Apple className="h-5 w-5" />}
              line1="Download on the"
              line2="App Store"
            />
            <WatchTutorialButton />
          </div>
        </div>
      )}
    </section>
  );
}

function StoreBadge({
  href,
  icon,
  line1,
  line2,
  size = "md",
}: {
  href: string;
  icon: React.ReactNode;
  line1: string;
  line2: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={href}
      // target="_blank"
      // rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg",
        size === "sm" ? "px-3 py-1.5" : "px-4 py-2.5"
      )}
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-slate-300">{line1}</span>
        <span className="block text-sm font-semibold">{line2}</span>
      </span>
    </Link>
  );
}

/** Locked store badge — same shape as StoreBadge, but visually disabled with a "Soon" ribbon. */
function LockedBadge({
  icon,
  line1,
  line2,
}: {
  icon: React.ReactNode;
  line1: string;
  line2: string;
}) {
  return (
    <div className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-400">
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-slate-400">{line1}</span>
        <span className="block text-sm font-semibold">{line2}</span>
      </span>
      <span className="absolute -right-2 -top-2 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-400 shadow-sm">
        Soon
      </span>
    </div>
  );
}

/**
 * Watch Tutorial button + video popup.
 *
 * The popup itself (Dialog + YouTube embed) is fully wired up below, but the
 * trigger is kept `disabled` for now per current requirements. Once the
 * tutorial video is ready, remove the `disabled` attribute and swap the
 * locked styling back to the active hover styles — no other changes needed.
 */
function WatchTutorialButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        disabled
        title="Tutorial video coming soon"
        onClick={() => setOpen(true)}
        className="relative inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400 shadow-sm"
      >
        <Lock className="h-3.5 w-3.5" />
        <Play className="h-4 w-4" />
        Watch Tutorial
        <span className="absolute -right-2 -top-2 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-400 shadow-sm">
          Soon
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>App Tutorial</DialogTitle>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Safetly Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AndroidGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.6 9.48 19.44 6.3a.5.5 0 0 0-.86-.5l-1.87 3.23a8.9 8.9 0 0 0-7.42 0L7.42 5.8a.5.5 0 1 0-.86.5l1.85 3.18C5.7 11.13 4 13.9 4 17h16c0-3.1-1.7-5.87-4.4-7.52ZM9 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#00D9FF" d="M3.6 2.3 14.9 12 3.6 21.7c-.3-.2-.6-.6-.6-1.1V3.4c0-.5.3-.9.6-1.1Z" />
      <path fill="#00F076" d="M14.9 12 3.6 2.3c.2-.1.5-.2.7-.2.3 0 .5.1.8.2l11.2 6.4L14.9 12Z" />
      <path fill="#FF3A44" d="M16.3 8.7 20.1 11c.6.4.6 1.6 0 2l-3.8 2.3-2.9-3.3 2.9-3.3Z" />
      <path fill="#FFCE00" d="M14.9 12 5.1 21.9c-.2.1-.5.2-.8.2-.2 0-.5 0-.7-.2L16.3 15.3 14.9 12Z" />
    </svg>
  );
}