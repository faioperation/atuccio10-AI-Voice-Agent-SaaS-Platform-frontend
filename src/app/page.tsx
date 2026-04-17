
import Features from "./components/Home/Features";
import Advantage from "./components/Home/Advantage";
import HowItWorks from "./components/Home/HowItWorks";
import Metrics from "./components/Home/Metrics";
import Pricing from "./components/Home/Pricing";
import Integrations from "./components/Home/Integrations";
import CTA from "./components/Home/CTA";
import Navbar from "./components/Home/Navbar";
import Hero from "./components/Home/Hero";
import Footer from "./components/Home/Footer";

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
