"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import AIAgent from "@/components/AIAgent";
import PersonalizedTrials from "@/components/PersonalizedTrials";
import MagneticButton from "@/components/MagneticButton";
import type { Trial } from "@/lib/clinicaltrials";

const POPULAR_SEARCHES = [
  { label: "Alzheimer's disease", condition: "Alzheimer's" },
  { label: "Type 2 Diabetes", condition: "Type 2 Diabetes" },
  { label: "Breast Cancer", condition: "Breast Cancer" },
  { label: "Depression", condition: "Depression" },
  { label: "Parkinson's disease", condition: "Parkinson's" },
  { label: "Heart failure", condition: "Heart failure" },
];

export default function HomePage() {
  const [personalizedTrials, setPersonalizedTrials] = useState<Trial[]>([]);
  const [personalizedCondition, setPersonalizedCondition] = useState("");

  function handleTrialsFound(trials: Trial[], condition: string) {
    setPersonalizedTrials(trials);
    setPersonalizedCondition(condition);
  }

  return (
    <>
      <main className="hero-bg flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-12 max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-[#2563EB] uppercase mb-4">
            Clinical trial search
          </p>
          <h1 className="text-4xl font-bold text-[#111827] leading-tight mb-4">
            Find trials that match you,
            <br />
            <span className="text-[#2563EB]">in plain English.</span>
          </h1>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Search over 500,000 clinical trials from ClinicalTrials.gov. We
            translate the medical language so you can focus on finding the right
            option.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <MagneticButton href="/results">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Browse Trials
          </MagneticButton>
          <MagneticButton href="#">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            For Patients
          </MagneticButton>
          <MagneticButton href="#">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
            </svg>
            For Researchers
          </MagneticButton>
          <MagneticButton href="/about">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            About
          </MagneticButton>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl">
          <SearchBar />
        </div>

        {/* Popular searches */}
        <div className="mt-10 w-full max-w-2xl">
          <p className="text-xs text-[#9CA3AF] text-center mb-4 uppercase tracking-wide font-medium">
            Popular searches
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR_SEARCHES.map((s) => (
              <Link
                key={s.condition}
                href={`/results?condition=${encodeURIComponent(s.condition)}`}
                className="pill-search px-4 py-2 rounded-full text-sm shadow-sm"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust note */}
        <p className="mt-16 text-xs text-[#9CA3AF] text-center max-w-sm">
          Data sourced from{" "}
          <a
            href="https://clinicaltrials.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#6B7280]"
          >
            ClinicalTrials.gov
          </a>
          . Always consult a healthcare provider before enrolling in any trial.
        </p>
      </main>

      {/* Personalized Trials — appears after AI agent gathers your info */}
      {personalizedTrials.length > 0 && (
        <PersonalizedTrials
          trials={personalizedTrials}
          condition={personalizedCondition}
        />
      )}

      {/* AI Agent floating button + chat panel */}
      <AIAgent onTrialsFound={handleTrialsFound} />
    </>
  );
}
