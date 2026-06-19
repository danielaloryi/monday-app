import { SiteNav } from "@/components/landing/SiteNav";
import { Hero } from "@/components/landing/Hero";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { Features } from "@/components/landing/Features";
import { ViewShowcase } from "@/components/landing/ViewShowcase";
import { Stats, Testimonials } from "@/components/landing/Social";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCTA, SiteFooter } from "@/components/landing/FooterCTA";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <ViewShowcase />
        <Stats />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
