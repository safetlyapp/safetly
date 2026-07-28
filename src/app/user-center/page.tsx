"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Grid2x2,
  ChevronDown,
  Ticket,
  Receipt,
  MoreHorizontal,
  AlertTriangle,
  Gem,
  Check,
} from "lucide-react";

const sidebarProducts: string[] = ["Safetly Personal", "Safetly Parental Control"];

export default function AccountSettingsPage() {
  const [productsOpen, setProductsOpen] = React.useState<boolean>(true);
  const [subscribed, setSubscribed] = React.useState<boolean>(true);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      {/* Status banner */}
      <div className="mx-auto mb-4 max-w-6xl text-[13px] text-slate-600">
        Status &quot;Dear [<span className="font-semibold text-slate-900">al-mamun</span>], Congratulations! You are
        now our premium member. Our all premium features unlocked for you. (Expires: September 30, 2026)&quot;
      </div>

      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-slate-100 p-6">
          <h2 className="mb-8 text-lg font-semibold text-slate-900">User Center</h2>

          <div className="mb-2 flex flex-col items-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <User className="h-7 w-7 text-slate-400" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold text-slate-900">Hi, al-mamun</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px]">
                🏅
              </span>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            <a
              href="#"
              className="flex items-center gap-2.5 rounded-lg bg-indigo-50 px-3 py-2.5 text-[14px] font-semibold text-indigo-700"
            >
              <User className="h-4 w-4" />
              Manage Account
            </a>

            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Grid2x2 className="h-4 w-4" />
              Manage Product(s)
              <ChevronDown
                className={`ml-auto h-3.5 w-3.5 text-slate-400 transition-transform ${
                  productsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {productsOpen && (
              <div className="ml-7 space-y-1 border-l border-slate-100 pl-4">
                {sidebarProducts.map((p) => (
                  <a key={p} href="#" className="block rounded-lg py-2 text-[13.5px] text-slate-500 hover:text-slate-900">
                    {p}
                  </a>
                ))}
              </div>
            )}

            <a
              href="#"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Ticket className="h-4 w-4" />
              Redeem Activation Code
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Receipt className="h-4 w-4" />
              Billing History
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">Account Settings</h1>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white">
            {/* Notice row */}
            <div className="grid grid-cols-[140px_1fr] gap-4 border-b border-slate-100 px-6 py-5">
              <div className="flex items-start gap-1.5 text-[14px] text-slate-500">
                Notice
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />:
              </div>
              <div>
                <p className="mb-3 text-[14px] leading-relaxed text-slate-700">
                  &quot;Dear [<span className="font-medium">al-mamun</span>], Your Premium membership has expired.
                  So, some exclusive features have been temporarily locked. To enjoy the premium features again,
                  Please upgrade your account.&quot;
                </p>
                <Button className="gap-1.5 rounded-md bg-orange-500 text-[13px] font-semibold hover:bg-orange-600">
                  <Gem className="h-3.5 w-3.5" />
                  Go Premium
                </Button>
              </div>
            </div>

            <Row label="Kids ID">
              <span className="text-[14px] text-slate-700">K12345</span>
            </Row>

            <Row label="Nickname">
              <span className="text-[14px] text-slate-700">al-mamun</span>
              <ChangeLink />
            </Row>

            <Row label="Email">
              <span className="text-[14px] text-slate-700">pemic41423@barumart.com</span>
              <ChangeLink />
            </Row>

            <Row label="Password">
              <span className="text-[14px] tracking-widest text-slate-700">********</span>
              <ChangeLink />
            </Row>

            <div className="grid grid-cols-[140px_1fr] items-center gap-4 border-b border-slate-100 px-6 py-5">
              <span className="text-[14px] text-slate-500">User type</span>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-slate-700">Free</span>
                <Button className="gap-1.5 rounded-md bg-emerald-600 text-[13px] font-semibold hover:bg-emerald-700">
                  <Gem className="h-3.5 w-3.5" />
                  Go Premium
                </Button>
              </div>
            </div>

            {/* Third-party login */}
            <div className="px-6 py-6">
              <p className="mb-4 text-[14px] font-semibold text-slate-800">
                You can also use third-party services to log in to Safetly:
              </p>

              <div className="space-y-4">
                <SocialRow
                  label="Google"
                  icon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.55-5.17 3.55-8.87z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.63H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.37z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.63l4 3.1C6.22 6.86 8.87 4.75 12 4.75z"
                      />
                    </svg>
                  }
                />
                <SocialRow
                  label="Facebook"
                  icon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <circle cx="12" cy="12" r="12" fill="#1877F2" />
                      <path
                        fill="#fff"
                        d="M15.5 12.5h-2v7h-3v-7H9v-2.6h1.5V8.4c0-1.5.9-2.8 3.1-2.8h2v2.5h-1.4c-.3 0-.7.2-.7.8v1.6h2.1l-.1 2.6z"
                      />
                    </svg>
                  }
                />
                <SocialRow
                  label="Apple"
                  icon={
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#000">
                      <path d="M16.36 1.43c0 1.14-.42 2.06-1.26 2.87-.9.86-1.98 1.36-3.15 1.27-.05-1.1.42-2.13 1.28-2.94.87-.83 2.06-1.32 3.13-1.2zM20.9 17.5c-.45 1.03-.98 1.98-1.61 2.86-.86 1.2-1.57 2.03-2.13 2.5-.86.76-1.79 1.15-2.78 1.17-.71.02-1.57-.2-2.57-.66-1-.45-1.92-.66-2.76-.66-.87 0-1.81.21-2.83.66-1.02.46-1.85.7-2.5.72-.94.04-1.88-.36-2.83-1.2-.61-.53-1.36-1.4-2.24-2.65C1.5 18.98.8 17.15.5 15.2c-.28-2.1-.03-3.9.75-5.4a5.94 5.94 0 0 1 2.34-2.5 5.72 5.72 0 0 1 2.9-.83c.75 0 1.72.24 2.94.72 1.21.48 1.99.72 2.34.72.26 0 1.13-.28 2.6-.85 1.4-.53 2.58-.75 3.55-.66 2.62.21 4.6 1.24 5.9 3.12-2.34 1.42-3.5 3.4-3.48 5.94.02 1.98.73 3.63 2.13 4.94.63.6 1.34 1.08 2.13 1.42-.17.5-.35.99-.55 1.45z" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Checkbox notice */}
            <div className="flex items-start gap-2.5 border-t border-slate-100 px-6 py-5">
              <button
                type="button"
                onClick={() => setSubscribed((v) => !v)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded ${
                  subscribed ? "bg-blue-600" : "border border-slate-300 bg-white"
                }`}
                aria-pressed={subscribed}
                aria-label="Toggle email subscription"
              >
                {subscribed && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </button>
              <p className="text-[12.5px] leading-relaxed text-slate-500">
                I am willing to receive all emails sent by Safetly, including the product updates, promotion
                events.
                <br />
                Note: Unselect the above checkbox to cancel the subscription. You will continue receiving important
                emails such as password reset notifications.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center gap-4 border-b border-slate-100 px-6 py-5">
      <span className="text-[14px] text-slate-500">{label}</span>
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
}

function ChangeLink() {
  return (
    <a href="#" className="text-[13.5px] font-medium text-blue-600 hover:underline">
      Change
    </a>
  );
}

function SocialRow({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[14px] text-slate-700">{label}</span>
      </div>
      <Button className="rounded-md bg-blue-600 px-6 text-[13px] font-semibold hover:bg-blue-700">Connect</Button>
    </div>
  );
}