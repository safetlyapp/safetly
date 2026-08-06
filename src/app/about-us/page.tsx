import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  MapPin,
  History,
  MapPinned,
  Clock,
  BarChart3,
  Ban,
  Globe,
  ScreenShare,
  Camera,
  Volume2,
  MessageSquare,
  Bell,
  Lock,
  UserCheck,
  Mail,
  Check,
} from "lucide-react";

const STATS = [
  { value: "7K+", label: "Downloads" },
  { value: "4.3", label: "Average rating", icon: "star" },
  { value: "2.7K", label: "Reviews" },
  { value: "24/7", label: "Protection" },
];

const FEATURES = [
  { icon: MapPin, title: "Live Location", body: "View the current location of a child's connected device." },
  { icon: History, title: "Location History", body: "Review previous location and movement information." },
  { icon: MapPinned, title: "Geofencing", body: "Get alerted when a device enters or leaves a designated area." },
  { icon: Clock, title: "Screen Time Management", body: "Monitor and manage how long a device is used." },
  { icon: BarChart3, title: "App Usage Reports", body: "See which applications are used and for how long." },
  { icon: Ban, title: "App Blocking", body: "Restrict or block selected applications." },
  { icon: Globe, title: "Content Filtering", body: "Limit access to inappropriate or unwanted online content." },
  { icon: ScreenShare, title: "Screen Mirroring", body: "Authorized viewing of a connected device's screen." },
  { icon: Camera, title: "Remote Camera", body: "Camera-related features for family safety purposes." },
  { icon: Volume2, title: "Surrounding Sound", body: "Assists with safety-related supervision needs." },
  { icon: MessageSquare, title: "Call & SMS Info", body: "Certain call or SMS-related information, where supported." },
  { icon: Bell, title: "Notification Monitoring", body: "Information about certain notifications received." },
];

const COMMITMENTS = [
  "Help create a safer digital environment for children",
  "Provide parents with simple and effective family-safety tools",
  "Encourage responsible and balanced technology use",
  "Respect user privacy and prioritize information security",
  "Develop reliable, accessible, and user-friendly services",
  "Help families stay safer, more informed, and better connected",
  "Continuously improve our services to meet changing safety needs",
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-sm font-medium text-secondary">About Safetly</p>
          <h1 className="mx-auto mt-2 max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            A safer, more balanced digital world for every family.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Safetly is a modern parental control and family safety platform
            that helps parents and legal guardians create a safer, more
            responsible digital environment for their children — with
            simple tools and appropriate guidance, not constant surveillance.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-medium text-secondary">Our mission</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Technology can be safe, useful, and beneficial for children.
        </h2>
        <div className="mt-4 space-y-4 text-slate-600">
          <p>
            Smartphones and the internet play an important role in
            children&apos;s education, communication, entertainment, and
            everyday life. Alongside those opportunities come real
            challenges — inappropriate content, excessive screen time,
            online risks, and digital safety concerns.
          </p>
          <p>
            Our mission is to give families technology that helps improve
            children&apos;s online and digital safety, while giving parents
            the information and tools they need to guide and manage device
            use responsibly. We believe that&apos;s only possible when
            supported by awareness, responsible use, and appropriate
            parental guidance — not fear.
          </p>
        </div>
      </section>

      {/* How Safetly helps — feature grid */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium text-secondary">How Safetly helps</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              Tools that support real family safety
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Availability may vary by device, OS, permissions, and your
              selected subscription plan.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & security */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-secondary">
              Privacy & security
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              Sensitive data, handled seriously.
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <p>
                Information associated with screen mirroring, remote
                camera, surrounding sound, call/SMS information, and
                notifications is transmitted using encrypted methods and is
                not permanently stored on Safetly&apos;s servers. It is only
                processed as necessary to operate the relevant feature and
                display it to the authorized parent account.
              </p>
              <p>
                Safetly does not intentionally use this sensitive
                live-feature data for advertising, and does not sell it to
                third parties. No internet-based system can be guaranteed
                completely secure, but we apply reasonable technical,
                organizational, and security measures to protect your
                information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                <Lock className="h-5 w-5 text-success" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Encrypted transmission
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Sensitive live features use encrypted methods end to end.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <ShieldCheck className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No permanent storage
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Camera, audio, and mirroring data isn&apos;t kept on our
                servers.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                Never sold to third parties
              </h3>
              <p className="mt-1.5 text-sm text-slate-600">
                We don&apos;t use sensitive live-feature data for
                advertising or sell it to anyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible use */}
      <section className="border-y border-slate-100 bg-slate-50/60 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-medium text-secondary">Responsible use</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Built for supervision, not secret surveillance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            Safetly is designed to be used only for your own child&apos;s
            device, your own device, or a device you have the legal right
            and appropriate authority to supervise. It is not intended for
            secretly monitoring or tracking another person or adult. Users
            are responsible for complying with applicable laws, privacy
            rights, and consent requirements — and we encourage open
            communication, education, and mutual trust between parents and
            children alongside any technology-based supervision.
          </p>
        </div>
      </section>

      {/* Our commitment */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium text-secondary">Our commitment</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            What we&apos;re working toward
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {COMMITMENTS.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10">
                <Check className="h-3.5 w-3.5 text-success" />
              </span>
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
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
            href="/login"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            Try it free
          </a>
          <a
            href="mailto:support@safetly.app"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" />
            support@safetly.app
          </a>
        </div>
      </section>
    </div>
  );
}