"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Download", href: "#download" },
  { label: "Pricing", href: "#pricing" },
  { label: "How to install", href: "#how-to-install" },
  { label: "Features", href: "#features" }, 
  { label: "FAQ", href: "#faq" }, 
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Safetly
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink >
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" >
            <Link href="/login">Sign in</Link>
          </Button>
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
            <Button variant="outline" >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}