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

const PRODUCT_LINKS = [
  { label: "AirDroid Parental Control", href: "/products/parental-control", desc: "Screen time, apps, and location for kids" },
  { label: "AirDroid Business", href: "/products/business", desc: "Remote device management for teams" },
  { label: "AirDroid Personal", href: "/products/personal", desc: "Remote control and file transfer" },
];

const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
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
            AirDroid
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-1 p-3">
                  {PRODUCT_LINKS.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink>
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 hover:bg-slate-50"
                        >
                          <p className="text-sm font-medium text-slate-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

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
          <Button className="bg-blue-600 hover:bg-blue-700" >
            <Link href="/login?mode=signup">Get started</Link>
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
          {PRODUCT_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login?mode=signup">Get started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}