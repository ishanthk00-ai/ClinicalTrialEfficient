"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import EligibilitySection from "@/components/EligibilitySection";
import type { Trial } from "@/lib/clinicaltrials";
import type { AISummary } from "@/lib/summarize";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#222232] rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-semibold text-[#111827] dark:text-[#EAEAF5] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#222232] rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-base font-semibold text-[#111827] dark:text-[#EAEAF5]">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-[#6B7280] dark:text-[#8686A8]" />
        ) : (
          <ChevronDown size={16} className="text-[#6B7280] dark:text-[#8686A8]" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-[#F3F4F6] dark:border-[#191924]">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AISummaryClient({ trial }: { trial: Trial }) {
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const cacheKey = `trialfind_summary_${trial.nctId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setSummary(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {
        // fall through to fetch
      }
    }

    fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: trial.title,
        briefSummary: trial.briefSummary,
        eligibilityCriteria: trial.eligibilityCriteria,
        studyType: trial.studyType,
        enrollment: trial.enrollment,
        phases: trial.phases,
        interventions: trial.interventions,
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data: AISummary) => {
        setSummary(data);
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      })
      .catch(() => setError("Failed to generate summary"))
      .finally(() => setLoading(false));
  }, [trial]);

  const primaryLocation = trial.locations[0];
  const primaryContact = trial.contacts[0];

  return (
    <div className="space-y-4">
      <SectionCard title="What is this trial?">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#8686A8]">
            <Loader2 size={14} className="animate-spin" />
            Generating plain-language summary...
          </div>
        ) : error ? (
          <p className="text-sm text-[#6B7280] dark:text-[#8686A8] leading-relaxed">
            {trial.briefSummary ?? "No summary available for this trial."}
          </p>
        ) : (
          <p className="text-sm text-[#374151] dark:text-[#CDCDE4] leading-relaxed">
            {summary?.plainSummary}
          </p>
        )}
      </SectionCard>

      <SectionCard title="Am I eligible?">
        <EligibilitySection summary={summary} loading={loading} error={error} />
      </SectionCard>

      <SectionCard title="What's involved?">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-[#6B7280] dark:text-[#8686A8]">
            <Loader2 size={14} className="animate-spin" />
            Summarizing study design...
          </div>
        ) : summary?.involved ? (
          <p className="text-sm text-[#374151] dark:text-[#CDCDE4] leading-relaxed">
            {summary.involved}
          </p>
        ) : (
          <p className="text-sm text-[#6B7280] dark:text-[#8686A8]">
            Study design details are not available for this trial.
          </p>
        )}
      </SectionCard>

      <SectionCard title="Where and how to apply">
        <div className="space-y-4">
          {primaryLocation && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1.5">
                Primary location
              </p>
              <p className="text-sm font-medium text-[#111827] dark:text-[#EAEAF5]">
                {primaryLocation.facility}
              </p>
              <p className="text-sm text-[#6B7280] dark:text-[#8686A8]">
                {[primaryLocation.city, primaryLocation.state, primaryLocation.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {trial.locations.length > 1 && (
                <p className="text-xs text-[#6B7280] dark:text-[#8686A8] mt-1">
                  +{trial.locations.length - 1} additional location
                  {trial.locations.length > 2 ? "s" : ""}
                </p>
              )}
            </div>
          )}

          {primaryContact && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1.5">
                Contact
              </p>
              {primaryContact.name && (
                <p className="text-sm font-medium text-[#111827] dark:text-[#EAEAF5]">
                  {primaryContact.name}
                </p>
              )}
              {primaryContact.phone && (
                <a href={`tel:${primaryContact.phone}`} className="text-sm text-[#2563EB] dark:text-[#5B9BFF] hover:underline block">
                  {primaryContact.phone}
                </a>
              )}
              {primaryContact.email && (
                <a href={`mailto:${primaryContact.email}`} className="text-sm text-[#2563EB] dark:text-[#5B9BFF] hover:underline block">
                  {primaryContact.email}
                </a>
              )}
            </div>
          )}

          <a
            href={`https://clinicaltrials.gov/study/${trial.nctId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] dark:bg-[#5B9BFF] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] dark:hover:bg-[#7DB2FF] transition-colors"
          >
            View on ClinicalTrials.gov
            <ExternalLink size={14} />
          </a>
        </div>
      </SectionCard>

      <CollapsibleSection title="Official details">
        <div className="mt-4 space-y-4 text-sm">
          {trial.officialTitle && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1">
                Official title
              </p>
              <p className="text-[#374151] dark:text-[#CDCDE4]">{trial.officialTitle}</p>
            </div>
          )}
          {trial.sponsor && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1">Sponsor</p>
              <p className="text-[#374151] dark:text-[#CDCDE4]">{trial.sponsor}</p>
            </div>
          )}
          {trial.studyType && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1">Study type</p>
              <p className="text-[#374151] dark:text-[#CDCDE4]">{trial.studyType}</p>
            </div>
          )}
          {trial.enrollment !== undefined && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1">Enrollment target</p>
              <p className="text-[#374151] dark:text-[#CDCDE4]">{trial.enrollment} participants</p>
            </div>
          )}
          {trial.eligibilityCriteria && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1">Raw eligibility criteria</p>
              <pre className="whitespace-pre-wrap text-[#374151] dark:text-[#CDCDE4] font-sans leading-relaxed bg-[#F9FAFB] dark:bg-[#181820] rounded-lg p-4 text-xs overflow-auto max-h-64">
                {trial.eligibilityCriteria}
              </pre>
            </div>
          )}
          {trial.briefSummary && (
            <div>
              <p className="text-xs text-[#9CA3AF] dark:text-[#44445E] uppercase tracking-wide font-medium mb-1">Official brief summary</p>
              <p className="text-[#374151] dark:text-[#CDCDE4] leading-relaxed">{trial.briefSummary}</p>
            </div>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
}
