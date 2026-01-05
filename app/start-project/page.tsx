"use client";

export default function StartProjectPage() {
  return (
    <>
      {/* HERO */}
      <section className="container-main py-44">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Start a Project
          </h1>

          <p className="mt-8 text-2xl text-[color:var(--text-muted)]">
            Engage senior architecture leadership to design, modernize,
            or stabilize enterprise platforms built for long-term scale.
          </p>
        </div>
      </section>

      {/* HOW WE ENGAGE */}
      <section className="container-main py-40">
        <div className="grid md:grid-cols-3 gap-24">
          <Step
            title="Understand the Platform"
            desc="We assess your current systems, constraints, and business goals to identify architectural risks and opportunities."
          />
          <Step
            title="Define Target-State Architecture"
            desc="We design a scalable, secure, and future-ready architecture aligned with long-term outcomes."
          />
          <Step
            title="Execute & Optimize"
            desc="We support delivery through hands-on engineering, automation, and continuous optimization."
          />
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="container-main py-40">
        <h2 className="text-4xl md:text-5xl font-semibold mb-24">
          Engagement Models
        </h2>

        <div className="grid md:grid-cols-2 gap-24">
          <Model
            title="Architecture Review (2–4 Weeks)"
            desc="A focused deep-dive resulting in a clear modernization and execution roadmap."
          />
          <Model
            title="Fractional Architecture Leadership"
            desc="On-demand senior architects embedded into complex programs without long hiring cycles."
          />
          <Model
            title="Accelerated Delivery"
            desc="Hands-on engineering using reusable automation frameworks to shorten timelines."
          />
          <Model
            title="Managed Automation Services"
            desc="Ongoing optimization of CI/CD, QA automation, and intelligent workflows."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container-main py-52 text-center">
        <h2 className="text-5xl md:text-6xl font-semibold mb-12">
          Let’s Talk About Your Platform
        </h2>

        <a
          href="/contact"
          className="btn-primary text-lg inline-block"
        >
          Book an Initial Discussion
        </a>
      </section>
    </>
  );
}

/* =========================
   HELPERS
========================= */

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">
        {title}
      </h3>
      <p className="text-lg text-[color:var(--text-muted)] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function Model({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">
        {title}
      </h3>
      <p className="text-lg text-[color:var(--text-muted)] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
