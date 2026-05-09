"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Trial } from "@/lib/clinicaltrials";
import TrialCard from "./TrialCard";

interface PersonalizedTrialsProps {
  trials: Trial[];
  condition: string;
}

export default function PersonalizedTrials({
  trials,
  condition,
}: PersonalizedTrialsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  if (trials.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 scroll-mt-16 anim-fade-up"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent)" }}
              >
                <Sparkles size={11} color="white" />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--accent)", fontFamily: "Sora, sans-serif" }}
              >
                AI-Curated
              </span>
            </div>

            <h2
              className="text-3xl font-bold mb-2 font-display"
              style={{ color: "var(--text)" }}
            >
              Your Personalized Trials
            </h2>

            <p
              className="text-sm"
              style={{ color: "var(--text-secondary)", fontFamily: "Sora, sans-serif" }}
            >
              {condition ? (
                <>
                  Showing{" "}
                  <strong style={{ color: "var(--text)" }}>
                    {trials.length} trials
                  </strong>{" "}
                  matched to{" "}
                  <strong style={{ color: "var(--text)" }}>{condition}</strong>
                </>
              ) : (
                <>
                  Showing{" "}
                  <strong style={{ color: "var(--text)" }}>
                    {trials.length} trials
                  </strong>{" "}
                  matched to your profile
                </>
              )}
            </p>
          </div>

          {condition && (
            <Link
              href={`/results?condition=${encodeURIComponent(condition)}`}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors shrink-0"
              style={{ color: "var(--accent)", fontFamily: "Sora, sans-serif" }}
            >
              See all results
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Trial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trials.map((trial) => (
            <TrialCard key={trial.nctId} trial={trial} />
          ))}
        </div>
      </div>
    </section>
  );
}
