import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "Parental Control", href: "/products/parental-control" },
      { label: "Business", href: "/products/business" },
      { label: "Personal", href: "/products/personal" },
      { label: "Cast", href: "/products/cast" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "/support" },
      { label: "Blog", href: "/blog" },
      { label: "System status", href: "/status" },
      { label: "API docs", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Affiliate program", href: "/affiliate" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "EULA policy", href: "/terms#eula" },
      { label: "Privacy Policy", href: "/terms#privacy" },
      { label: "Payment terms", href: "/terms#payment" },
      { label: "Security Center", href: "/terms#security" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-slate-900">
                AirDroid
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Secure remote access and parental control, trusted worldwide.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-slate-400 hover:text-blue-600"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} AirDroid. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms#privacy" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms#eula" className="hover:text-blue-600">
              EULA
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * lucide-react removed brand/logo icons (Facebook, Twitter, Youtube,
 * Linkedin, etc.) a few versions back since they're trademarked marks,
 * not generic icons. These small inline SVGs replace them 1:1.
 */
type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.53-1.5H16.7V3.7c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.92 1.42-3.92 4.03v2.25H8v3.1h2.42V21h3.08Z" />
    </svg>
  );
}

function TwitterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 3H21.7l-6.06 6.93L22.8 21h-5.58l-4.37-5.72L7.83 21H5.02l6.48-7.41L4.4 3h5.72l3.95 5.23L18.9 3Zm-.98 16.2h1.53L7.16 4.7H5.52l12.4 14.5Z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.92C15.44 4 12 4 12 4h-.01s-3.44 0-6.54.12c-.43.05-1.36.05-2.19.92C2.6 5.7 2.4 7.2 2.4 7.2S2.2 8.95 2.2 10.7v1.6c0 1.75.2 3.5.2 3.5s.21 1.5.87 2.16c.83.87 1.92.84 2.41.94 1.75.17 7.32.22 7.32.22s3.44 0 6.54-.13c.43-.05 1.36-.05 2.19-.92.66-.66.87-2.16.87-2.16s.2-1.75.2-3.5v-1.6c0-1.75-.2-3.5-.2-3.5ZM9.95 14.6V8.8l5.6 2.9-5.6 2.9Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.2a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-6.06c0-1.45-.03-3.3-2.01-3.3-2.02 0-2.33 1.58-2.33 3.2V20H9.36V8.5h3.24v1.57h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.26 4.06 5.2V20Z" />
    </svg>
  );
}