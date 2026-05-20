import Advantage from "@/components/Home/Advantage";
import CTA from "@/components/Home/CTA";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Integrations from "@/components/Home/Integrations";
import Metrics from "@/components/Home/Metrics";
import Navbar from "@/components/Home/Navbar";
import Pricing from "@/components/Home/Pricing";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Advantage />
        <HowItWorks />
        <Metrics />
        <Pricing />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
