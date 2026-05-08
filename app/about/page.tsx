import Link from "next/link";
import { ArrowRight, Database, Cpu, ShieldCheck, Search, BookOpen, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "About — TrialFind",
  description: "Learn how TrialFind makes clinical trial search accessible to everyone.",
};

const STATS = [
  {
    value: "500,000+",
    label: "Clinical trials indexed",
    sub: "From ClinicalTrials.gov, updated in real time",
  },
  {
    value: "80%",
    label: "Enrollment shortfall rate",
    sub: "Of trials struggle to meet their patient targets",
  },
  {
    value: "2.3M",
    label: "Patients searching annually",
    sub: "Looking for trials but struggling to navigate the system",
  },
];

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Search",
    body: "Type a condition, disease, or keyword in plain language. TrialFind queries the full ClinicalTrials.gov database live — no stale snapshots.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "Understand",
    body: "Every trial's eligibility criteria, protocol language, and study design gets translated into plain English by AI — so you actually know what you're looking at.",
  },
  {
    n: "03",
    icon: ArrowUpRight,
    title: "Connect",
    body: "Get full contact details, primary locations, and a direct link to the official trial record. The next step is yours to take.",
  },
];

const TECH = [
  {
    icon: Database,
    title: "ClinicalTrials.gov",
    body: "The world's largest clinical trial registry, maintained by the U.S. National Library of Medicine. Over 500,000 trials from 221 countries.",
  },
  {
    icon: Cpu,
    title: "Claude AI",
    body: "Plain-language summaries are generated on demand by Claude (Anthropic). Summaries are informational — always verify eligibility with the study team.",
  },
  {
    icon: ShieldCheck,
    title: "No account required",
    body: "TrialFind stores nothing server-side about you. Bookmarks live in your browser only. No signup, no tracking.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative py-28 px-6">
        {/* Atmospheric glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% -8%, var(--accent-glow) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-6"
            style={{ color: "var(--accent)" }}
          >
            Our mission
          </p>
          <h1
            className="font-display text-5xl md:text-6xl font-bold leading-[1.08] mb-8"
            style={{ color: "var(--text)" }}
          >
            Making clinical research{" "}
            <span style={{ color: "var(--accent)" }}>navigable</span>
            {" "}for everyone.
          </h1>
          <p
            className="text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Clinical trials drive medical breakthroughs — but finding one, let alone
            understanding whether you qualify, has always required navigating dense
            medical language. TrialFind changes that.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-3d">
              <span className="btn-3d__shadow" aria-hidden="true" />
              <span className="btn-3d__edge" aria-hidden="true" />
              <span className="btn-3d__front">
                Search trials
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
            <a
              href="https://clinicaltrials.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--btn-radius)] text-sm font-medium transition-colors"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "var(--bg-elevated)",
              }}
            >
              ClinicalTrials.gov
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--border-subtle)" }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="px-8 py-10"
              style={{ background: "var(--bg)" }}
            >
              <p
                className="font-display text-5xl font-bold tracking-tight mb-2"
                style={{ color: "var(--accent)" }}
              >
                {s.value}
              </p>
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                {s.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Problem statement ────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-5" style={{ color: "var(--accent)" }}>
            The problem
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6"
            style={{ color: "var(--text)" }}
          >
            The information exists. The access doesn't.
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p>
              ClinicalTrials.gov holds records for over half a million studies. But its
              search interface is built for researchers, not patients or caregivers. Eligibility
              criteria are written in dense inclusion/exclusion language. Phase numbers,
              interventional designs, and NCT identifiers mean nothing to most people.
            </p>
            <p>
              The result: patients who might qualify for trials that could change their
              outcomes simply never find them. And trials that could reach enrollment targets
              struggle to find participants.
            </p>
            <p>
              TrialFind sits between that raw data and the people who need it — translating,
              filtering, and surfacing what matters.
            </p>
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "var(--accent)" }}>
              How it works
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>
              Three steps from condition to contact.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="font-display text-4xl font-bold leading-none"
                      style={{ color: "var(--border)" }}
                    >
                      {step.n}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent-bg)" }}
                    >
                      <Icon size={15} style={{ color: "var(--accent)" }} />
                    </div>
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Technology ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "var(--accent)" }}>
              Technology &amp; data
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>
              Built on primary sources.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TECH.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl p-6"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "var(--accent-bg)" }}
                  >
                    <Icon size={16} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3
                    className="text-sm font-semibold mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Important note ───────────────────────────────── */}
      <section className="py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-xl px-6 py-5 flex gap-4 items-start"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
          >
            <BookOpen size={16} className="mt-0.5 shrink-0" style={{ color: "var(--text-tertiary)" }} />
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
                Informational use only
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                TrialFind helps you find and understand trials — it does not determine your
                eligibility. Final eligibility is assessed by the study team at each site.
                Always consult a qualified healthcare provider before making any medical decision
                or enrolling in a clinical study.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section
        className="py-24 px-6 text-center"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <h2
          className="font-display text-4xl font-bold mb-4"
          style={{ color: "var(--text)" }}
        >
          Ready to find a trial?
        </h2>
        <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
          Search 500,000+ trials from ClinicalTrials.gov, right now.
        </p>
        <Link href="/" className="btn-3d" style={{ "--btn-pad-x": "3rem", "--btn-pad-y": "0.9rem", "--btn-font-size": "1.0625rem" } as React.CSSProperties}>
          <span className="btn-3d__shadow" aria-hidden="true" />
          <span className="btn-3d__edge" aria-hidden="true" />
          <span className="btn-3d__front">
            Start searching
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </Link>
      </section>

    </main>
  );
}
