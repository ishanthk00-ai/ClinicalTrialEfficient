import { notFound } from "next/navigation";
import { getTrialById } from "@/lib/clinicaltrials";
import StatusBadge from "@/components/StatusBadge";
import BookmarkButton from "@/components/BookmarkButton";
import AISummaryClient from "./AISummaryClient";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Users } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nctId: string }>;
}) {
  const { nctId } = await params;
  const trial = await getTrialById(nctId);
  return {
    title: trial ? `${trial.title} — TrialFind` : "Trial not found — TrialFind",
  };
}

export default async function TrialDetailPage({
  params,
}: {
  params: Promise<{ nctId: string }>;
}) {
  const { nctId } = await params;
  const trial = await getTrialById(nctId);

  if (!trial) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/results"
        className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to results
      </Link>

      {/* Two-column layout (Stripe docs style) */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <StatusBadge status={trial.status} />
              {trial.phases.map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]"
                >
                  {p}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-[#111827] leading-snug mb-1">
              {trial.title}
            </h1>
            <p className="text-sm text-[#9CA3AF]">{trial.nctId}</p>
          </div>

          {/* AI-powered sections */}
          <AISummaryClient trial={trial} />
        </div>

        {/* Sidebar — quick facts */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-6 space-y-4">
            {/* Bookmark */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#111827]">
                  Save this trial
                </span>
                <BookmarkButton trial={trial} size="md" />
              </div>
            </div>

            {/* Quick facts */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">
                Quick facts
              </h3>
              <dl className="space-y-3">
                {trial.startDate && (
                  <div className="flex items-start gap-2">
                    <CalendarDays size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-[#9CA3AF]">Start date</dt>
                      <dd className="text-sm text-[#111827] font-medium">
                        {trial.startDate}
                      </dd>
                    </div>
                  </div>
                )}
                {trial.enrollment !== undefined && (
                  <div className="flex items-start gap-2">
                    <Users size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-xs text-[#9CA3AF]">Enrollment</dt>
                      <dd className="text-sm text-[#111827] font-medium">
                        {trial.enrollment.toLocaleString()} participants
                      </dd>
                    </div>
                  </div>
                )}
                {trial.sponsor && (
                  <div>
                    <dt className="text-xs text-[#9CA3AF]">Sponsor</dt>
                    <dd className="text-sm text-[#111827]">{trial.sponsor}</dd>
                  </div>
                )}
                {trial.primaryPurpose && (
                  <div>
                    <dt className="text-xs text-[#9CA3AF]">Purpose</dt>
                    <dd className="text-sm text-[#111827] capitalize">
                      {trial.primaryPurpose.toLowerCase().replace(/_/g, " ")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* All locations */}
            {trial.locations.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">
                  Locations ({trial.locations.length})
                </h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto">
                  {trial.locations.map((loc, i) => (
                    <li key={i} className="text-xs text-[#374151]">
                      {loc.facility && (
                        <span className="font-medium block">{loc.facility}</span>
                      )}
                      {[loc.city, loc.state, loc.country]
                        .filter(Boolean)
                        .join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
