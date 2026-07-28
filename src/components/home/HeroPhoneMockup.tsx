"use client";

import {
  RefreshCw,
  ShieldCheck,
  Plus,
  MessageCircle,
  Grid3x3,
  Globe,
  Lock,
  Home,
  Repeat,
  BarChart3,
  User,
  Signal,
  Wifi,
  BatteryFull,
} from "lucide-react";

const FEATURE_CARDS = [
  {
    icon: MessageCircle,
    title: "Social Media Protection",
    desc: "Control access to social platforms and limit screen time",
    variant: "full" as const,
  },
  {
    icon: Grid3x3,
    title: "App Blocking",
    desc: "Block specific apps or entire app categories",
    variant: "peek" as const,
  },
  {
    icon: Globe,
    title: "Website Filtering",
    desc: "Block harmful websites and inappropriate content",
    variant: "full" as const,
  },
  {
    icon: Lock,
    title: "Device Security",
    desc: "Prevent DNS changes and app uninstallation",
    variant: "peek" as const,
  },
];

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: false },
  { icon: Repeat, label: "Habits", active: false },
  { icon: ShieldCheck, label: "Parental", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: User, label: "Profile", active: false },
];

export default function HeroPhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px]">
      {/* Floating status badges */}
      <div className="absolute -left-6 top-10 z-30 hidden items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 shadow-lg sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-xs font-medium text-white">Reels blocked</span>
      </div>

      <div className="absolute -right-8 bottom-24 z-30 hidden items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 shadow-lg sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-xs font-medium text-white">
          Social Media Time Limit On
        </span>
      </div>

      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.25rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900" />

        {/* Status bar */}
        <div className="flex items-center justify-between bg-white px-5 pb-1 pt-2 text-[10px] font-medium text-slate-900">
          <span>11:19</span>
          <div className="flex items-center gap-1 text-slate-700">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Screen content */}
        <div className="bg-white px-4 pb-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-900">
              Child Device Protection
            </span>
            <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="mt-2 text-[13px] font-semibold text-slate-900">
              Protect Your Child Digital Life
            </p>
            <p className="mt-1 text-[10px] leading-snug text-slate-500">
              Start by adding a child device to manage their online safety,
              control app access, and monitor their digital activities.
            </p>
          </div>

          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2 text-[11px] font-semibold text-white shadow-sm">
            <Plus className="h-3.5 w-3.5" />
            Add Child Device
          </button>

          <p className="mt-4 text-[10px] font-medium text-slate-400">
            What you can do:
          </p>

          {/* Stacked feature cards */}
          <div className="relative mt-2">
            {FEATURE_CARDS.map((card, i) => (
              <FeatureRow key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-3 py-2">
          {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-0.5 ${
                active ? "text-emerald-600" : "text-slate-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[8px] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots under the phone */}
      <div className="mt-3 flex justify-center gap-1.5">
        <span className="h-1.5 w-4 rounded-full bg-slate-900" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  desc,
  variant,
  index,
}: {
  icon: typeof MessageCircle;
  title: string;
  desc: string;
  variant: "full" | "peek";
  index: number;
}) {
  if (variant === "peek") {
    return (
      <div
        className="relative flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 shadow-sm"
        style={{ zIndex: index, marginTop: index === 0 ? 0 : "-6px" }}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Icon className="h-3 w-3" />
        </span>
        <span className="truncate text-[10px] font-semibold text-slate-700">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-start gap-2 rounded-xl bg-white px-3 py-2.5 shadow-md ring-1 ring-slate-100"
      style={{ zIndex: index + 10, marginTop: index === 0 ? 0 : "-4px" }}
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Icon className="h-3 w-3" />
      </span>
      <span>
        <span className="block text-[11px] font-semibold text-slate-900">
          {title}
        </span>
        <span className="block text-[9px] leading-snug text-slate-500">
          {desc}
        </span>
      </span>
    </div>
  );
}