"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Lock, User, User2, Building2 } from "lucide-react";

export default function LoginPage() {
  // "signin" | "signup" controls which card is shown
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Illustration side */}
<div className="hidden lg:flex justify-center items-center">
  <div className="relative w-full max-w-xl aspect-square">
    <Image
      src="/hero.jpeg"
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
          <Card className="w-full max-w-md border-slate-200 shadow-sm">
            <CardContent className="p-8">
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
          className="text-sm text-blue-600 hover:underline"
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
          <FieldWithIcon icon={Lock} id="password" type="password" placeholder="Password" />
        <FieldWithIcon
          icon={Lock}
          id="confirm-password"
          type="password"
          placeholder="Confirm password"
        />
        <FieldWithIcon icon={User} id="nickname" type="text" placeholder="Nickname" />

        <div className="flex items-start gap-2 pt-1">
          <Checkbox id="agree" className="mt-0.5" />
          <Label htmlFor="agree" className="text-xs font-normal text-slate-600 leading-snug">
            I agree with Safetly&apos;s{" "}
            <a href="#" className="text-blue-600 hover:underline">
              EULA Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </Label>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Next
        </Button>
      </form>

      <SocialDivider />
    </div>
  );
}

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-5">
      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-2 w-full bg-transparent p-0 h-auto border-b border-slate-200 rounded-none">
          <TabsTrigger
            value="personal"
            className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none pb-3"
          >
            <User2 className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none pb-3"
          >
            <Building2 className="h-4 w-4" />
            Business
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="pt-5">
          <SignInFields onSwitch={onSwitch} />
        </TabsContent>
        <TabsContent value="business" className="pt-5">
          <SignInFields onSwitch={onSwitch} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SignInFields({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-slate-900">Sign in to Safetly</h1>

      <form className="space-y-4">
        <FieldWithIcon icon={Mail} id="signin-email" type="email" placeholder="Email" />
        <FieldWithIcon icon={Lock} id="signin-password" type="password" placeholder="Password" />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Checkbox id="stay-signed-in" />
            <Label htmlFor="stay-signed-in" className="font-normal text-slate-600">
              Stay signed in
            </Label>
          </div>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Sign in
        </Button>

        <button
          type="button"
          onClick={onSwitch}
          className="block w-full text-center text-sm text-blue-600 hover:underline"
        >
          Sign up
        </button>
      </form>

      <SocialDivider />
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

function SocialDivider() {
  return (
    <div className="space-y-3">
      <div className="relative flex items-center justify-center">
        <Separator className="absolute w-full" />
        <span className="relative bg-white px-3 text-xs text-slate-400">or</span>
      </div>

      <Button variant="outline" className="w-full gap-2">
        <GoogleIcon className="h-4 w-4" />
        Google
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="gap-2">
          <FacebookIcon className="h-4 w-4 text-blue-600" />
          Facebook
        </Button>
        <Button variant="outline" className="gap-2">
          <AppleIcon className="h-4 w-4" />
          Apple
        </Button>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.85-.08-1.48-.24-2.13H12v3.86h6.47c-.13 1.03-.83 2.6-2.4 3.65l-.02.15 3.48 2.7.24.02c2.22-2.05 3.5-5.06 3.5-8.25Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.17 0 5.83-1.05 7.77-2.85l-3.7-2.87c-.99.69-2.32 1.17-4.07 1.17-3.1 0-5.73-2.05-6.67-4.88l-.14.01-3.62 2.8-.05.13C2.68 21.3 7 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.33 14.57a7.35 7.35 0 0 1-.4-2.36c0-.82.15-1.62.39-2.36L5.32 9.7 1.65 6.83l-.12.06A12 12 0 0 0 0 12.21c0 1.94.47 3.77 1.53 5.4l3.8-3.04Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.73c2.2 0 3.68.95 4.53 1.75l3.31-3.23C17.82 1.24 15.17 0 12 0 7 0 2.68 2.7.53 6.7l3.8 2.94c.94-2.83 3.57-4.9 6.67-4.9Z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.53-1.5H16.7V3.7c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.92 1.42-3.92 4.03v2.25H8v3.1h2.42V21h3.08Z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.03 1.5c.08 1.02-.32 2-.9 2.7-.6.72-1.6 1.28-2.58 1.2-.1-1 .38-2.02.95-2.68.63-.74 1.7-1.28 2.53-1.22ZM19.9 17.3c-.3.7-.66 1.36-1.1 1.97-.6.85-1.1 1.44-1.48 1.77-.6.55-1.24.83-1.93.85-.5.01-1.1-.14-1.8-.45-.7-.31-1.35-.45-1.93-.45-.6 0-1.26.14-1.98.45-.72.31-1.3.47-1.75.48-.66.03-1.32-.26-1.98-.87-.4-.36-.93-.98-1.57-1.86-.7-.95-1.27-2.06-1.72-3.32-.48-1.36-.72-2.68-.72-3.96 0-1.47.32-2.73.95-3.79.5-.85 1.16-1.52 1.98-2.02.82-.5 1.7-.75 2.65-.77.53 0 1.23.16 2.1.48.86.32 1.42.48 1.66.48.18 0 .8-.19 1.85-.56 1-.35 1.83-.5 2.52-.44 1.86.15 3.26.88 4.19 2.2-1.66 1.01-2.49 2.42-2.47 4.24.02 1.42.53 2.6 1.53 3.55.46.44.97.78 1.53 1.02-.12.36-.25.7-.39 1.03Z" />
    </svg>
  );
}