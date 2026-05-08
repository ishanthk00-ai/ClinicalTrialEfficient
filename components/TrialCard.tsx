"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Trial } from "@/lib/clinicaltrials";
import StatusBadge from "./StatusBadge";
import BookmarkButton from "./BookmarkButton";

function getFirstLocation(trial: Trial): string {
  const loc = trial.locations[0];
  if (!loc) return "";
  return [loc.city, loc.state, loc.country]
    .filter(Boolean)
    .join(", ");
}

function getSnippet(text?: string): string {
  if (!text) return "";
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, 2).join(" ").slice(0, 240);
}

export default function TrialCard({ trial }: { trial: Trial }) {
  const location = getFirstLocation(trial);
  const snippet = getSnippet(trial.briefSummary);
  const extraLocations = trial.locations.length > 1
    ? `+${trial.locations.length - 1} more`
    : null;

  return (
    <Link
      href={`/trial/${trial.nctId}`}
      className="block group"
    >
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-200">
        {/* Top row: status badge + bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={trial.status} />
            {trial.phases.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]">
                {trial.phases.join(" / ")}
              </span>
            )}
          </div>
          <BookmarkButton trial={trial} />
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-[#111827] leading-snug line-clamp-2 mb-2 group-hover:text-[#2563EB] transition-colors">
          {trial.title}
        </h3>

        {/* Snippet */}
        {snippet && (
          <p className="text-sm text-[#6B7280] line-clamp-2 mb-3 leading-relaxed">
            {snippet}
          </p>
        )}

        {/* Footer: location + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F3F4F6]">
          {location ? (
            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <MapPin size={12} className="shrink-0" />
              {location}
              {extraLocations && (
                <span className="text-[#9CA3AF]">{extraLocations}</span>
              )}
            </span>
          ) : (
            <span className="text-xs text-[#9CA3AF]">Multiple locations</span>
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
            View details
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
