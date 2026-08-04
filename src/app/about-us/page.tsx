import { ShieldCheck, HeartHandshake, Sparkles, Star } from "lucide-react";

const STATS = [
  { value: "7K+", label: "Downloads" },
  { value: "4.3", label: "Average rating", icon: Star },
  { value: "2.7K", label: "Reviews" },
  { value: "24/7", label: "Protection" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    color: "primary",
    title: "Protection first",
    body: "Every feature starts from one question: does this keep a child safer today? If it doesn't, it doesn't ship.",
  },
  {
    icon: HeartHandshake,
    color: "secondary",
    title: "Built on trust",
    body: "Safetly is a tool for open families, not a spying app. We design for conversations between parents and kids, not just control.",
  },
  {
    icon: Sparkles,
    color: "success",
    title: "Always improving",
    body: "New harmful content patterns show up every week. Our detection and blocking rules are updated just as often.",
  },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary" },
  success: { bg: "bg-success/10", text: "text-success" },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-sm font-medium text-secondary">About Safetly</p>
          <h1 className="mx-auto mt-2 max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Digital safety shouldn&apos;t feel like surveillance.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            We build tools that help parents protect their children online
            without turning the family phone into a battleground. Less
            snooping, more peace of mind.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="flex items-center justify-center gap-1 text-2xl font-bold text-slate-900">
                {stat.value}
                {stat.icon && (
                  <stat.icon className="h-4 w-4 fill-success text-success" />
                )}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-medium text-secondary">Why we started</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          A phone in a child&apos;s pocket is a door to the whole internet.
        </h2>
        <div className="mt-4 space-y-4 text-slate-600">
          <p>
            Most parental control apps we tried were either too complicated to
            set up, too easy for a curious kid to bypass, or so intrusive
            that they broke the trust between parent and child. We wanted
            something different: real protection that works quietly in the
            background, and clear visibility for parents when it matters.
          </p>
          <p>
            Safetly started as a small tool built for a handful of families
            in Bangladesh who wanted their kids&apos; screen time to feel safe
            without feeling watched every second. It has since grown into a
            full suite of screen time, content, and location tools, but the
            starting question hasn&apos;t changed: what would actually help a
            parent sleep better at night?
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium text-secondary">What we believe</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              The principles behind every feature
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((value) => {
              const c = colorClasses[value.color];
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}
                  >
                    <value.icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{value.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Join thousands of families already protected
        </h2>
        <p className="mx-auto mt-2 max-w-md text-slate-600">
          Basic protection is free. Upgrade any time for full control over
          apps, content, and screen time.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/checkout"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            Try it free
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            Talk to us
          </a>
        </div>
      </section>
    </div>
  );
}