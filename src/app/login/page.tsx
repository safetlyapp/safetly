"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Mail, User, Baby, Users, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  // "signin" | "signup" controls which card is shown
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Illustration side */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-full max-w-xl aspect-square">
            <Image
              src="/hero.png"
              alt="A family protected online"
              fill
              sizes="(max-width: 1024px) 0px, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Form side */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md rounded-2xl border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold tracking-tight text-slate-900">
                  Safetly
                </span>
              </div>

              {mode === "signup" ? (
                <SignUpForm onSwitch={() => setMode("signin")} />
              ) : (
                <SignInForm onSwitch={() => setMode("signup")} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Create account</h1>
        <button
          onClick={onSwitch}
          className="text-sm text-primary hover:underline"
        >
          Or sign in
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <FieldWithIcon icon={Mail} id="email" type="email" placeholder="Email" />
          <p className="mt-1.5 text-xs text-slate-500">
            We need to verify your email, please enter a valid one.
          </p>
        </div>
        <PasswordField id="password" placeholder="Password" />
        <PasswordField id="confirm-password" placeholder="Confirm password" />
        <FieldWithIcon icon={User} id="nickname" type="text" placeholder="Nickname" />

        <div className="flex items-start gap-2 pt-1">
          <Checkbox id="agree" className="mt-0.5" />
          <Label htmlFor="agree" className="text-xs font-normal text-slate-600 leading-snug">
            I agree with Safetly&apos;s{" "}
            <a href="#" className="text-primary hover:underline">
              EULA Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
        >
          Next
        </Button>
      </form>
    </div>
  );
}

type Audience = "kid" | "parent";

const SIGNIN_COPY: Record<
  Audience,
  { heading: string; subtext: string; placeholder: string }
> = {
  kid: {
    heading: 'Log in to the "Safetly" kid\u2019s account.',
    subtext:
      "Enter a valid email address, nickname, or kid\u2019s ID (which you received after installing the kid\u2019s app).",
    placeholder: "Email address, nickname, or kid\u2019s ID",
  },
  parent: {
    heading: 'Log in to the "Safetly" parents\u2019 account.',
    subtext:
      "Enter a valid email address, nickname, or parents\u2019 ID (which you received after installing the parents\u2019 app).",
    placeholder: "Email address, nickname, or parents\u2019 ID",
  },
};

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [audience, setAudience] = useState<Audience>("kid");

  return (
    <div className="space-y-5">
      {/* Custom Kid's / Parents switcher — plain buttons, no shadcn Tabs */}
      <div className="grid grid-cols-2 gap-1.5 rounded-full border border-slate-200 bg-slate-100 p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => setAudience("kid")}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            audience === "kid"
              ? "border-secondary bg-white text-accent-foreground shadow-sm"
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          <Baby className="h-4 w-4" />
          Kid&apos;s
        </button>
        <button
          type="button"
          onClick={() => setAudience("parent")}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            audience === "parent"
              ? "border-secondary bg-white text-accent-foreground shadow-sm"
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          <Users className="h-4 w-4" />
          Parents
        </button>
      </div>

      <SignInFields onSwitch={onSwitch} audience={audience} />
    </div>
  );
}

function SignInFields({
  onSwitch,
  audience,
}: {
  onSwitch: () => void;
  audience: Audience;
}) {
  const copy = SIGNIN_COPY[audience];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{copy.heading}</h1>
        <p className="mt-1.5 text-xs text-slate-500">{copy.subtext}</p>
      </div>

      <form className="space-y-4">
        <Input
          id={`signin-id-${audience}`}
          type="text"
          placeholder={copy.placeholder}
        />
        <PasswordField
          id={`signin-password-${audience}`}
          placeholder="Password"
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Checkbox id={`stay-signed-in-${audience}`} />
            <Label
              htmlFor={`stay-signed-in-${audience}`}
              className="font-normal text-slate-600"
            >
              Stay signed in
            </Label>
          </div>
          <a href="#" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
        >
          Sign in
        </Button>
      </form>

    </div>
  );
}

function FieldWithIcon({
  icon: Icon,
  id,
  type,
  placeholder,
}: {
  icon: typeof Mail;
  id: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input id={id} type={type} placeholder={placeholder} className="pl-9" />
    </div>
  );
}

/** Password input with no leading icon, plus a show/hide toggle on the right. */
function PasswordField({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      >
        {visible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}