"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Apple } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HowToInstall() {
  const [audience, setAudience] = useState<"parents" | "kids">("parents");

  return (
    <section id="how-to-install" className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
        How to Install
      </h2>
      <p className="mt-2 text-slate-600">
        Install on every device you need protected
      </p>

      <Tabs defaultValue="android" className="mt-8">
        <TabsList className="mx-auto grid w-fit grid-cols-2 rounded-full bg-slate-100 p-1">
          <TabsTrigger
            value="android"
            className="rounded-full px-6 data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700"
          >
            Android
          </TabsTrigger>
          <TabsTrigger
            value="ios"
            className="rounded-full px-6 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            iOS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="android" className="mt-6">
          <p className="text-sm text-slate-600">
            To install Safetly in your Android device automatically please
            follow the below link
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge
              href="https://play.google.com/store/search?q=parental+control&c=apps"
              icon={<PlayStoreIcon className="h-6 w-6" />}
              line1="GET IT ON"
              line2="Google Play"
            />
            <WatchTutorialButton />
          </div>
        </TabsContent>

        <TabsContent value="ios" className="mt-6">
          <p className="text-sm text-slate-600">
            To install Safetly on your iOS device, download it from the App
            Store
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge
              href="https://mysite.app/apkdownload"
              icon={<Apple className="h-6 w-6" />}
              line1="Download on the"
              line2="App Store"
            />
            <WatchTutorialButton />
          </div>
        </TabsContent>
      </Tabs>

      {/* Parents / Kids devices */}
      <div className="mt-12">
        <div className="mx-auto flex w-fit rounded-full bg-slate-100 p-1">
          <button
            onClick={() => setAudience("parents")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              audience === "parents"
                ? "bg-violet-100 text-violet-700"
                : "text-slate-500"
            )}
          >
            For Parents&apos; Devices
          </button>
          <button
            onClick={() => setAudience("kids")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              audience === "kids"
                ? "bg-violet-100 text-violet-700"
                : "text-slate-500"
            )}
          >
            For Kids&apos; Devices
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {audience === "parents" ? (
            <>
              <StoreBadge
                href="https://play.google.com/store/search?q=parental+control&c=apps"
                icon={<PlayStoreIcon className="h-5 w-5" />}
                line1="GET IT ON"
                line2="Google Play"
                size="sm"
              />
              <StoreBadge
                href="https://mysite.app/apkdownload"
                icon={<Apple className="h-5 w-5" />}
                line1="Download on the"
                line2="App Store"
                size="sm"
              />
            </>
          ) : (
            <>
              <ComingSoonBadge
                icon={<PlayStoreIcon className="h-5 w-5" />}
                line1="GET IT ON"
                line2="Google Play"
              />
              <ComingSoonBadge
                icon={<Apple className="h-5 w-5" />}
                line1="Download on the"
                line2="App Store"
              />
            </>
          )}
        </div>
      </div>
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
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800",
        size === "sm" ? "px-3 py-1.5" : "px-4 py-2"
      )}
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-slate-300">{line1}</span>
        <span className="block text-sm font-semibold">{line2}</span>
      </span>
    </a>
  );
}

function ComingSoonBadge({
  icon,
  line1,
  line2,
}: {
  icon: React.ReactNode;
  line1: string;
  line2: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="inline-flex items-center gap-2 rounded-lg bg-slate-300 px-3 py-1.5 text-white">
        {icon}
        <span className="text-left leading-tight">
          <span className="block text-[10px]">{line1}</span>
          <span className="block text-sm font-semibold">{line2}</span>
        </span>
      </div>
      <span className="rounded border border-slate-300 px-2 py-0.5 text-xs text-slate-400">
        Coming soon...
      </span>
    </div>
  );
}

function WatchTutorialButton() {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
      <Play className="h-4 w-4" />
      Watch Tutorial
    </button>
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