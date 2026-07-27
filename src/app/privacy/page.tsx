"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "eula", label: "EULA policy" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "payment", label: "Payment terms" },
  { id: "distribution", label: "Distribution agreement" },
  { id: "security", label: "Security Center" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

export default function TermsPage() {
  const [active, setActive] = useState<SectionId>("security");

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-xl font-semibold text-slate-900">
          Terms &amp; Condition
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
          <nav className="space-y-1 self-start rounded-lg border border-slate-200 p-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                  active === item.id
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div>
            {active === "security" ? <SecurityCenter /> : <Placeholder id={active} /> }
          </div>
        </div>
      </div>
    </div>
  );
}

function Placeholder({ id }: { id: SectionId }) {
  const item = NAV_ITEMS.find((n) => n.id === id)!;
  return (
    <div className="text-sm text-slate-500">
      {item.label} content goes here.
    </div>
  );
}

function SecurityCenter() {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-slate-600">
      <Section title="Data center and security infrastructure">
        <p>
          At AirDroid, we use Amazon Web Services to host our cloud infrastructure,
          products, and services, enabling us to provide our customers and users
          with a secure network and computing environment. These security measures
          include firewalls at the network, application, and instance layers, data
          encryption, DDoS mitigation, and more. Furthermore, all servers storing
          sensitive data are located in Silicon Valley (USA) and Germany.
        </p>
        <p>
          All AirDroid servers are located in secure data centers that comply with
          ISO 27001. The data centers used by AirDroid have implemented top-tier
          security controls, meaning that personal access control, video
          surveillance, motion detectors, 24/7 monitoring, and on-site security
          ensure that only authorized personnel can enter the data centers. The
          highest security standards are applied to the protection of both hardware
          and data. The single point of entry to the data center also features
          detailed identity verification protocols. All these measures work
          together to guarantee the highest security standards for the protection
          of both hardware and data.
        </p>
      </Section>

      <Section title="Session encryption and authentication">
        <p>
          When establishing a session, AirDroid will determine the best connection
          type. After the server completes the handshake, 80% of all connections
          will use the TLS tunnel (https or wss), while the rest will connect via
          TCP or UDP.
        </p>
        <p>
          AirDroid communication uses RSA public/private keys, as well as AES
          (256-bit) session encryption similar to https/SSL, which meet all
          current security standards.
        </p>
        <p>
          Since the private key never leaves the client&apos;s computer, this
          process ensures that the system, including AirDroid&apos;s routing
          server, cannot decrypt the data stream; therefore, not even AirDroid, as
          the server owner, can read the encrypted data.
        </p>
      </Section>

      <Section title="Interruption">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Compromising the integrity of our systems, including probing,
            scanning or testing the vulnerability of any system or network, unless
            expressly authorized to perform such activities.
          </li>
          <li>
            Reverse engineer, manipulate or hack our services, circumvent any
            security protocol or authentication measure, or unlawfully attempt to
            gain unauthorized access to customer accounts, services, networks and
            data.
          </li>
          <li>
            Overloading or attempting to overload our infrastructure or systems by
            imposing an excessively large load that consumes extraordinary
            resources (RAM, CPU, bandwidth, etc.).
          </li>
        </ul>
      </Section>

      <Section title="Illicit activities">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Engaging in &quot;phishing&quot; or &quot;spoofing&quot;, falsifying
            your identity or falsely suggesting any association with AirDroid.
          </li>
          <li>
            Using the services to violate the privacy of other people, including
            phishing, posting confidential information about other people without
            prior consent, or collecting and obtaining personally identifiable
            information about our users from our services.
          </li>
          <li>
            Using our services to harass, bully, or post direct or specific
            threats of violence against other people.
          </li>
          <li>
            Use the services for any illegal purpose or in violation of the law
            (including, without limitation, data protection, privacy and export
            control laws).
          </li>
          <li>
            Accessing, copying content, or searching our services by any means
            other than our officially supported public interfaces.
          </li>
        </ul>
      </Section>

      <p className="text-slate-500">
        In such cases, AirDroid will retain all its legal rights.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-base font-semibold text-slate-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}