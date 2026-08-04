"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@safetly.app",
    href: "mailto:support@safetly.app",
    color: "primary",
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
    color: "secondary",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Dhaka, Bangladesh",
    href: undefined,
    color: "success",
  },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary" },
  success: { bg: "bg-success/10", text: "text-success" },
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push("Please enter your name.");
    if (!email.trim()) {
      newErrors.push("Please enter your email address.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push("Please enter a valid email address.");
    }
    if (!message.trim()) newErrors.push("Please write a message.");

    setErrors(newErrors);
    if (newErrors.length === 0) {
      // TODO: wire up to the actual support inbox / ticketing endpoint
      console.log("Contact form submitted", { name, email, subject, message });
      setSubmitted(true);
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-sm font-medium text-secondary">Contact Us</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            We&apos;re here to help
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-slate-600">
            Questions about setup, billing, or a feature you wish existed?
            Send us a message — a real person reads every one.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.3fr]">
          {/* Contact info */}
          <div className="space-y-4">
            {CONTACT_INFO.map((item) => {
              const c = colorClasses[item.color];
              const content = (
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg}`}
                  >
                    <item.icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-slate-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Support hours</p>
              <p className="mt-1">Everyday · 9:00 AM – 10:00 PM (GMT+6)</p>
              <p className="mt-3">
                Most emails get a reply within a few hours during support
                hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="rounded-2xl border-slate-200 shadow-md">
            <CardContent className="p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-slate-900">
                    Message sent
                  </h2>
                  <p className="mt-1 max-w-xs text-sm text-slate-600">
                    Thanks for reaching out — we&apos;ll get back to you soon
                    at {email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setSubject("");
                      setMessage("");
                    }}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name" className="mb-1.5 text-sm">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-1.5 text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="mb-1.5 text-sm">
                      Subject{" "}
                      <span className="font-normal text-slate-400">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="mb-1.5 text-sm">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us what's going on..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </Button>

                  {errors.length > 0 && (
                    <div
                      className={cn(
                        "space-y-1.5 rounded-md border border-destructive/20 bg-destructive/5 p-3"
                      )}
                    >
                      {errors.map((err) => (
                        <p
                          key={err}
                          className="flex items-start gap-1.5 text-xs text-destructive"
                        >
                          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          {err}
                        </p>
                      ))}
                    </div>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}