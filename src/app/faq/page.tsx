import FaqContent from "@/components/faq-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Safetly",
  description:
    "Frequently asked questions about Safetly parental controls, family safety, subscriptions, payments, and privacy.",
};

export default function FaqPage() {
  return <FaqContent />;
}