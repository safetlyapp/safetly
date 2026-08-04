import Link from "next/link";

const SAFETLY_LINKS = [
  { label: "About us", href: "/about-us" },
  { label: "Contact us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/policy/privacy-policy" },
  { label: "Terms of Service", href: "/policy/terms-of-service" },
  { label: "Payment and Refund Policy", href: "/policy/payment-and-refund-policy" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Telegram", href: "https://telegram.org", icon: TelegramIcon },
  { label: "Threads", href: "https://threads.net", icon: ThreadsIcon },
];

export default function SafetlyFooter() {
  return (
    <footer className="w-full bg-slate-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Safetly</h3>
          <div className="mt-2 h-px w-16 bg-slate-300" />
          <p className="mt-4 max-w-xs text-sm text-slate-600">
            &quot;Safetly&quot; is a trusted digital security app designed
            for parents, children, and families. Block harmful content,
            reduce unnecessary time waste, and create a safe online
            environment for your family.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Safetly</h3>
          <div className="mt-2 h-px w-16 bg-slate-300" />
          <ul className="mt-4 space-y-2">
            {SAFETLY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-violet-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Social media</h3>
          <div className="mt-2 h-px w-16 bg-slate-300" />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-success hover:text-white hover:shadow-md hover:shadow-success/30"
              >
                <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Safetly. All rights reserved.
      </div>
    </footer>
  );
}

/**
 * lucide-react removed brand/logo icons (Facebook, Youtube, Linkedin,
 * Instagram, etc.) since they're trademarked marks, not generic icons.
 * These small inline SVGs replace them 1:1.
 */
type IconProps = { className?: string };

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.92C15.44 4 12 4 12 4h-.01s-3.44 0-6.54.12c-.43.05-1.36.05-2.19.92C2.6 5.7 2.4 7.2 2.4 7.2S2.2 8.95 2.2 10.7v1.6c0 1.75.2 3.5.2 3.5s.21 1.5.87 2.16c.83.87 1.92.84 2.41.94 1.75.17 7.32.22 7.32.22s3.44 0 6.54-.13c.43-.05 1.36-.05 2.19-.92.66-.66.87-2.16.87-2.16s.2-1.75.2-3.5v-1.6c0-1.75-.2-3.5-.2-3.5ZM9.95 14.6V8.8l5.6 2.9-5.6 2.9Z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.53-1.5H16.7V3.7c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.92 1.42-3.92 4.03v2.25H8v3.1h2.42V21h3.08Z" />
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

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 3H22l-7.5 8.6L22.9 21h-6.7l-5.2-6.5L4.9 21H1.8l8-9.1L1.3 3h6.8l4.7 6z" />
    </svg>
  );
}

function TiktokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 3h-3.1v12.4a2.7 2.7 0 1 1-2.7-2.7c.2 0 .5 0 .7.08V9.6a5.9 5.9 0 1 0 5.1 5.85V9.3a7.6 7.6 0 0 0 4.4 1.4V7.6a4.5 4.5 0 0 1-4.4-4.6Z" />
    </svg>
  );
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.4 4.4 2.8 11.6c-1 .4-1 1.6.1 1.9l4.6 1.4 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.8 4.7 3.5c.8.6 2 .2 2.2-.8l3-16.4c.2-1.1-.9-2-1.9-1.6ZM8.5 14.4l8.4-6.9c.2-.2.4.1.2.3l-7 7.1-.3 3.3-1.3-3.8Z" />
    </svg>
  );
}

function ThreadsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M12 21c4.5 0 7-2.6 7-7.3 0-.9-.1-1.9-.4-2.9-.6-2.5-2.3-4.6-6-4.8-3-.2-5 1.1-5.4 3.2-.2 1.1.5 2 1.6 2.1 1 .1 1.6-.5 1.8-1.2.2-.9 1-1.3 2-1.2 1.8.1 2.4 1.4 2.6 2.6.1.6.1 1.3.1 1.9-.6-.4-1.4-.6-2.4-.6-2.3 0-4 1.3-4 3.3 0 1.9 1.6 3.2 3.8 3.2 2 0 3.3-.9 3.9-2.4" />
    </svg>
  );
}