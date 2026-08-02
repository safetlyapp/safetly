"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X, ShieldCheck, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Download", href: "#download" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-96px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Safetly
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-slate-700 hover:text-primary"
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary transition-opacity",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop actions */}
        <div className="hidden items-center lg:flex">
          <Link href="/login">
            <LoginButton />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="p-2 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-slate-700" />
          ) : (
            <Menu className="h-5 w-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-slate-200 bg-white transition-[max-height] duration-200 lg:hidden",
          mobileOpen ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-primary font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <LoginButton className="w-full justify-center" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function LoginButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-sky-600 py-2 pl-11 pr-6 text-sm font-semibold text-white shadow-sm ring-1 ring-sky-600/20 transition-all duration-200 hover:shadow-md hover:shadow-sky-500/25 hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-700 active:translate-y-0",
        className
      )}
    >
      <span className="absolute left-1.5 top-0 flex h-full w-8 items-center justify-center rounded-full rounded-t-none bg-white shadow-sm transition-transform duration-200 group-hover:scale-105">
        <Lock className="h-3.5 w-3.5 text-sky-600" />
      </span>
      <span className="tracking-wide">Login</span>
    </button>
  );
}