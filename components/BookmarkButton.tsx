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
    setSaved(toggleBookmark(trial));
  }

  const iconSize = size === "md" ? 18 : 15;
  const btnSize = size === "md" ? "p-2" : "p-1.5";

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove bookmark" : "Bookmark this trial"}
      className={`${btnSize} rounded-lg border transition-all ${
        saved
          ? "bg-[#2563EB] dark:bg-[#5B9BFF] border-[#2563EB] dark:border-[#5B9BFF] text-white"
          : "bg-white dark:bg-[#181820] border-[#E5E7EB] dark:border-[#222232] text-[#6B7280] dark:text-[#8686A8] hover:border-[#2563EB] dark:hover:border-[#5B9BFF] hover:text-[#2563EB] dark:hover:text-[#5B9BFF]"
      }`}
    >
      <Bookmark size={iconSize} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
    </button>
  );
}
