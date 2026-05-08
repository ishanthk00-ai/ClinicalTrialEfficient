import { Suspense } from "react";
import { searchTrials } from "@/lib/clinicaltrials";
import TrialCard from "@/components/TrialCard";
import FilterPanel from "@/components/FilterPanel";
import SearchBar from "@/components/SearchBar";
import SkeletonCard from "@/components/SkeletonCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SearchParams {
  condition?: string;
  location?: string;
  status?: string;
  phase?: string;
  ageGroup?: string;
  pageToken?: string;
}

async function ResultsContent({ searchParams }: { searchParams: SearchParams }) {
  const { condition, location, status, phase, ageGroup, pageToken } = searchParams;

  if (!condition) {
    return (
      <div className="text-center py-16">
        <p className="text-[#6B7280]">Enter a condition to search for trials.</p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-[#2563EB] hover:underline"
        >
          Go back to search
        </Link>
      </div>
    );
  }

  let result;
  try {
    result = await searchTrials({ condition, location, status, phase, ageGroup, pageToken });
  } catch {
    return (
      <div className="text-center py-16">
        <p className="text-[#111827] font-medium mb-2">Something went wrong</p>
        <p className="text-sm text-[#6B7280]">
          We couldn&apos;t reach ClinicalTrials.gov. Please try again in a moment.
        </p>
      </div>
    );
  }

  const { trials, nextPageToken, totalCount } = result;

  if (trials.length === 0) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
          🔍
        </div>
        <h3 className="font-semibold text-[#111827] mb-2">No trials found</h3>
        <p className="text-sm text-[#6B7280] leading-relaxed">
          No trials found for{" "}
          <span className="font-medium text-[#111827]">{condition}</span>
          {location && (
            <>
              {" "}near{" "}
              <span className="font-medium text-[#111827]">{location}</span>
            </>
          )}
          . Try broadening your search by removing filters or searching without a location.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <Link
            href={`/results?condition=${encodeURIComponent(condition)}`}
            className="text-sm px-4 py-2 bg-white border border-[#E5E7EB] rounded-full hover:border-[#2563EB] text-[#374151] transition-colors"
          >
            Search without location
          </Link>
          <Link
            href="/"
            className="text-sm px-4 py-2 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] transition-colors"
          >
            New search
          </Link>
        </div>
      </div>
    );
  }

  const nextParams = new URLSearchParams();
  if (condition) nextParams.set("condition", condition);
  if (location) nextParams.set("location", location);
  if (status) nextParams.set("status", status);
  if (phase) nextParams.set("phase", phase);
  if (ageGroup) nextParams.set("ageGroup", ageGroup);
  if (nextPageToken) nextParams.set("pageToken", nextPageToken);

  return (
    <>
      {totalCount !== undefined && (
        <p className="text-sm text-[#6B7280] mb-5">
          Showing {trials.length} of {totalCount.toLocaleString()} trials
          {condition && (
            <>
              {" "}for{" "}
              <span className="font-medium text-[#111827]">{condition}</span>
            </>
          )}
          {location && (
            <>
              {" "}near{" "}
              <span className="font-medium text-[#111827]">{location}</span>
            </>
          )}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trials.map((trial) => (
          <TrialCard key={trial.nctId} trial={trial} />
        ))}
      </div>

      {nextPageToken && (
        <div className="mt-8 text-center">
          <Link href={`/results?${nextParams.toString()}`} className="btn-3d btn-3d--sm">
            <span className="btn-3d__shadow" aria-hidden="true" />
            <span className="btn-3d__edge" aria-hidden="true" />
            <span className="btn-3d__front">
              Load more trials
              <ChevronRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </div>
      )}
    </>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const { condition, location } = resolvedParams;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Compact search bar */}
      <div className="mb-8">
        <SearchBar
          initialCondition={condition}
          initialLocation={location}
          compact
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <div className="hidden lg:block w-52 shrink-0">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={<SkeletonGrid />}>
            <ResultsContent searchParams={resolvedParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
