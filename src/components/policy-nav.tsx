"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Privacy Policy", href: "/policy/privacy-policy" },
  { label: "Terms of Service", href: "/policy/terms-of-service" },
  { label: "Payment and Refund Policy", href: "/policy/payment-and-refund-policy" },
] as const;

export default function PolicyNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 self-start rounded-lg border border-slate-200 shadow-2xl p-2">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
              isActive
                ? "bg-blue-50 font-medium text-blue-600"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}