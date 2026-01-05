"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container-main text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="heading-xl max-w-6xl mx-auto"
        >
          ArchFlow
          <br />
          <span className="text-[color:var(--primary)]">
            Architecture That Scales
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.15 }}
          className="mt-12 text-xl max-w-3xl mx-auto text-[color:var(--text-muted)] leading-relaxed"
        >
          Senior-led software engineering and intelligent automation
          for enterprise platforms that demand long-term stability.
        </motion.p>
      </div>
    </section>
  );
}
