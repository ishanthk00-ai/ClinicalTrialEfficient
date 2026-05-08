"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { getBookmarks } from "@/lib/bookmark";
import TrialCard from "@/components/TrialCard";
import type { Trial } from "@/lib/clinicaltrials";

export default function SavedPage() {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTrials(getBookmarks());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-8 w-40 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-36 bg-white border border-[#E5E7EB] rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
          <Bookmark size={16} className="text-[#2563EB]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Saved trials</h1>
          <p className="text-sm text-[#6B7280]">
            {trials.length} {trials.length === 1 ? "trial" : "trials"} saved
          </p>
        </div>
      </div>

      {trials.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bookmark size={20} className="text-[#9CA3AF]" />
          </div>
          <h3 className="font-semibold text-[#111827] mb-2">No saved trials</h3>
          <p className="text-sm text-[#6B7280] mb-6">
            Bookmark trials from search results to keep track of ones you&apos;re
            interested in.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
          >
            Search for trials
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trials.map((trial) => (
            <TrialCard key={trial.nctId} trial={trial} />
          ))}
        </div>
      )}
    </div>
  );
}
