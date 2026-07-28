import type { Metadata } from "next";
import {  Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/header";
import Footer from "@/components/footer";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Safetly",
  description: "Secure remote access and parental control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", figtree.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        <main className="flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
