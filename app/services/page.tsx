"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/motion";

export default function ServicesPage() {
  return (
    <>
      <motion.section
        className="container-main py-44"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-5xl">
          <h1 className="text-6xl font-semibold leading-tight">
            Architecture-Led
            <br />
            Engineering Services
          </h1>

          <p className="mt-10 text-2xl text-[color:var(--text-muted)]">
            We partner with enterprises to modernize platforms, accelerate
            delivery, and design systems built for long-term scale.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="container-main py-40"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-x-32 gap-y-28">
          <Service
            title="Software Modernization"
            points={[
              "Legacy system transformation",
              "Cloud-native & microservices architectures",
              "API-first platform engineering",
              "Scalability & resilience tuning",
            ]}
          />

          <Service
            title="Intelligent Automation"
            points={[
              "Automation strategy & roadmaps",
              "DevOps & CI/CD pipelines",
              "QA & test automation frameworks",
              "AI-assisted workflows",
            ]}
          />

          <Service
            title="Architecture Leadership"
            points={[
              "Enterprise & solution architecture",
              "Target-state architecture design",
              "Risk reduction & governance",
              "Hands-on senior guidance",
            ]}
          />

          <Service
            title="Cloud & Platform Engineering"
            points={[
              "AWS, Azure, GCP delivery",
              "Kubernetes & containers",
              "Serverless & event-driven systems",
              "Secure cloud foundations",
            ]}
          />
        </div>
      </motion.section>

      <motion.section
        className="container-main py-52 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
      >
        <h2 className="text-6xl font-semibold mb-14">
          Let’s Design Your
          <br />
          Target-State Architecture
        </h2>

        <a href="/request-architecture-review" className="btn-primary text-lg">
          Request an Architecture Review →
        </a>
      </motion.section>
    </>
  );
}

function Service({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div>
      <h3 className="text-3xl font-semibold mb-8">{title}</h3>
      <ul className="space-y-4 text-xl text-[color:var(--text-muted)]">
        {points.map((p, i) => (
          <li key={i}>— {p}</li>
        ))}
      </ul>
    </div>
  );
}
