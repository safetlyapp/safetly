import Faq from "@/components/home/Faq";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowToInstall from "@/components/home/HowToInstall";
import Pricing from "@/components/home/Pricing";
import Reviews from "@/components/home/Reviews";


export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowToInstall />
      <Pricing />
      <Reviews />
      <Faq />
    </>
  );
}