"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmark";
import type { Trial } from "@/lib/clinicaltrials";

export default function BookmarkButton({
  trial,
  size = "sm",
}: {
  trial: Trial;
  size?: "sm" | "md";
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(trial.nctId));
  }, [trial.nctId]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleBookmark(trial);
    setSaved(nowSaved);
  }

  const iconSize = size === "md" ? 18 : 15;
  const btnSize = size === "md" ? "p-2" : "p-1.5";

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove bookmark" : "Bookmark this trial"}
      className={`${btnSize} rounded-lg border transition-all ${
        saved
          ? "bg-[#2563EB] border-[#2563EB] text-white"
          : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#2563EB] hover:text-[#2563EB]"
      }`}
    >
      <Bookmark
        size={iconSize}
        fill={saved ? "currentColor" : "none"}
        strokeWidth={2}
      />
    </button>
  );
}
