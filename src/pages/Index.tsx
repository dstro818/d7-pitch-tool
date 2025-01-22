import { motion } from "framer-motion";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </div>
  );
};

export default Index;