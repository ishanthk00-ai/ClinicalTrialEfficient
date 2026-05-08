"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { AISummary } from "@/lib/summarize";

interface Props {
  summary: AISummary | null;
  loading: boolean;
  error?: string;
}

export default function EligibilitySection({ summary, loading, error }: Props) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#6B7280] py-4">
        <Loader2 size={16} className="animate-spin" />
        Generating eligibility summary...
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-[#6B7280] py-2">
        Unable to generate eligibility summary. See official details below.
      </p>
    );
  }

  if (!summary || (summary.qualify.length === 0 && summary.notQualify.length === 0)) {
    return (
      <p className="text-sm text-[#6B7280] py-2">
        Eligibility criteria are not available for this trial.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {summary.qualify.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[#111827] mb-3">
            You may qualify if...
          </h4>
          <ul className="space-y-2.5">
            {summary.qualify.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-[#374151]">
                <CheckCircle
                  size={16}
                  className="text-green-500 mt-0.5 shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.notQualify.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[#111827] mb-3">
            You may not qualify if...
          </h4>
          <ul className="space-y-2.5">
            {summary.notQualify.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-[#374151]">
                <XCircle
                  size={16}
                  className="text-red-400 mt-0.5 shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
