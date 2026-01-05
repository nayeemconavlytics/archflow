"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";
import PS5Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Card from "@/components/Card"; 
import { stagger } from "@/components/motion";

export default function Main() {
  const [activeTab, setActiveTab] = useState(0);

  // FUNCTIONALITY: Trigger the "Shiver/Vibration" effect on tab change
  useEffect(() => {
    const triggerVibration = () => {
      const event = new CustomEvent("gravitational-wave");
      window.dispatchEvent(event);
    };
    
    triggerVibration();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 0: return <HomePageContent />;
      case 1: return <AboutPage />;
      case 2: return <ServicesPage />; 
      case 3: return <WhyWorkWithUs />;
      case 4: return <EstimatePage />;
      case 5: return <ContactContent />;
      default: return <HomePageContent />;
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      {/* BACKGROUND LAYER 
          - activeTab triggers the Silhouette morphing
          - Internal listeners in ThreeBackground handle the "gravitational-wave" vibration
      */}
      <ThreeBackground activeTab={activeTab} />
      
      <Cursor />

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: "blur(15px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION LAYER */}
      <PS5Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}

/* =========================
    PAGE COMPONENTS
========================= */

function HomePageContent() {
  return (
    <>
      <Hero />
      <motion.section 
        className="container-main py-40" 
        variants={stagger} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
      >
        <div className="mb-24 max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-[color:var(--text-muted)]">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-semibold mt-6 text-white leading-tight">Engineering Modern<br />Enterprise Systems</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <Card meta="Modernization" title="Platform Modernization" desc="Transform legacy systems into cloud-native platforms." />
          <Card meta="Architecture" title="Architecture-Led Delivery" desc="Senior architects define structure before code is written." />
          <Card meta="Cloud Systems" title="Cloud Native" desc="Design resilient systems across AWS, Azure, and GCP." />
          <Card meta="Automation" title="Intelligent Automation" desc="Embed automation across CI/CD and infrastructure." />
          <Card meta="Security" title="Security by Design" desc="Zero-trust security built into architecture." />
          <Card meta="Performance" title="Scalability Engineering" desc="Engineer platforms that scale under enterprise workloads." />
        </div>
      </motion.section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="container-main py-44">
      <div className="max-w-5xl">
        <span className="text-sm uppercase tracking-widest text-[color:var(--text-muted)]">Our Story</span>
        <h1 className="text-6xl font-semibold mt-6 text-white">Built by Architects.</h1>
        <p className="mt-10 text-2xl text-[color:var(--text-muted)] leading-relaxed">
          We bridge the gap between high-level strategy and low-level execution. Software excellence is our foundation.
        </p>
      </div>
    </section>
  );
}

function ServicesPage() {
  return (
    <section className="container-main py-44">
      <div className="max-w-5xl">
        <h1 className="text-6xl font-semibold text-white">Engineering Services</h1>
        <p className="mt-10 text-2xl text-[color:var(--text-muted)] mb-20">We partner with enterprises to design systems built to scale.</p>
        <div className="grid md:grid-cols-2 gap-20">
          <Service title="Software Modernization" points={["Legacy transformation", "Cloud-native architectures"]} />
          <Service title="Architecture Leadership" points={["Target-state design", "Technical governance"]} />
        </div>
      </div>
    </section>
  );
}

function WhyWorkWithUs() {
  return (
    <section className="container-main py-44">
      <h1 className="text-6xl font-semibold mb-28 text-white">The Advantage</h1>
      <div className="grid md:grid-cols-3 gap-10">
        <Model title="Senior Expertise" desc="Direct access to principal architects with 15+ years experience." />
        <Model title="Zero Tech Debt" desc="We prioritize clean architecture and rigorous documentation." />
        <Model title="Proven Patterns" desc="Battle-tested cloud-native patterns to accelerate roadmaps." />
      </div>
    </section>
  );
}

function EstimatePage() {
  return (
    <section className="container-main py-44 text-center">
      <h1 className="text-6xl font-semibold mb-8 text-white">Project Estimate</h1>
      <button className="btn-primary px-12 py-5 text-xl mt-12">Generate Proposal →</button>
    </section>
  );
}

function ContactContent() {
  return (
    <section className="container-main py-44 flex flex-col items-center">
      <h1 className="text-7xl font-bold mb-10 text-white">Initiate Signal</h1>
      <div className="w-full max-w-xl space-y-6">
        <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white outline-none" />
        <button className="btn-primary w-full py-6 text-xl">Send Signal</button>
      </div>
    </section>
  );
}

/* =========================
    HELPERS
========================= */
function Service({ title, points }: { title: string; points: string[] }) {
  return (
    <div>
      <h3 className="text-3xl font-semibold mb-8 text-white">{title}</h3>
      <ul className="space-y-4 text-xl text-[color:var(--text-muted)]">
        {points.map((p, i) => (<li key={i}>— {p}</li>))}
      </ul>
    </div>
  );
}

function Model({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-10 border border-white/5 bg-white/[0.01] rounded-[32px] backdrop-blur-sm">
      <h3 className="text-3xl font-semibold mb-6 text-white">{title}</h3>
      <p className="text-lg text-[color:var(--text-muted)]">{desc}</p>
    </div>
  );
}