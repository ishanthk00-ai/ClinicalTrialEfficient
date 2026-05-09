"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import AIAgent from "@/components/AIAgent";
import PersonalizedTrials from "@/components/PersonalizedTrials";
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
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-16">
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
                className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#EFF6FF] transition-all shadow-sm"
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
