"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Smartphone, ImageIcon, Camera, MapPin, AlarmClock, MonitorSmartphone } from "lucide-react";

const FEATURES_LEFT = [
  // "Live Screen Mirroring",
  // "Inappropriate Image & Video Detection",
  // "Remote Camera",
  // "Sound around Child",
  "Location & Route Tracking",
  "App/Game & Web Blocker",
  "Downtime App",
];

const FEATURES_RIGHT = [
  "App Time Limits",
  "Geofencing",
  // "Calls & SMS Monitoring",
  "Social Content Monitoring",
  "View App Notifications",
  // "Browsing History",
  "Usage Report",
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 md:text-4xl">
          Our Advance Premium Features
        </h2>
        <p className="mt-2 md:text-lg text-slate-600">
          Feature availability varies depending on whether your child is
          using the Android or iOS operating system.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-[280px_1fr]">
        {/* Phone illustration with moving icons */}
        <div className="relative mx-auto flex h-72 w-40 items-center justify-center rounded-3xl border-4 border-slate-900 bg-slate-50">
          <MonitorSmartphone className="h-10 w-10 text-slate-300" />

          <FloatingIcon
            className="-left-4 top-4 bg-pink-100 text-pink-500"
            dx={10}
            dy={-10}
            duration={3.2}
            delay={0}
          >
            <Camera className="h-4 w-4" />
          </FloatingIcon>

          <FloatingIcon
            className="-right-4 top-2 bg-sky-100 text-sky-500"
            dx={-10}
            dy={-12}
            duration={2.8}
            delay={0.4}
          >
            <ImageIcon className="h-4 w-4" />
          </FloatingIcon>

          <FloatingIcon
            className="-left-5 bottom-16 bg-amber-100 text-amber-500"
            dx={12}
            dy={8}
            duration={3.6}
            delay={0.8}
          >
            <AlarmClock className="h-4 w-4" />
          </FloatingIcon>

          <FloatingIcon
            className="-right-5 bottom-14 bg-violet-100 text-violet-500"
            dx={-12}
            dy={10}
            duration={3}
            delay={1.2}
          >
            <MapPin className="h-4 w-4" />
          </FloatingIcon>

          <FloatingIcon
            className="-bottom-3 right-6 bg-emerald-100 text-emerald-600"
            dx={-6}
            dy={-8}
            duration={3.4}
            delay={0.2}
          >
            <Smartphone className="h-4 w-4" />
          </FloatingIcon>
        </div>

        {/* Checklist */}
        <div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {[...FEATURES_LEFT, ...FEATURES_RIGHT].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className=" text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="mt-6 bg-blue-600  cursor-pointer hover:bg-blue-800 " >
            Try it free
          </Button>
        </div>
      </div>

      {/* keyframes for the floating icons — move out, then drift back */}
      <style jsx global>{`
        @keyframes float-drift {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(var(--float-dx), var(--float-dy));
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </section>
  );
}

function FloatingIcon({
  children,
  className,
  dx = 10,
  dy = -10,
  duration = 3,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  dx?: number;
  dy?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <span
      className={`absolute flex h-8 w-8 items-center justify-center rounded-full shadow-sm ${className}`}
      style={
        {
          "--float-dx": `${dx}px`,
          "--float-dy": `${dy}px`,
          animation: `float-drift ${duration}s ease-in-out ${delay}s infinite`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}