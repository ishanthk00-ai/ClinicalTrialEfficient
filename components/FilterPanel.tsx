"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "RECRUITING", label: "Recruiting" },
  { value: "ACTIVE_NOT_RECRUITING", label: "Active, not recruiting" },
  { value: "COMPLETED", label: "Completed" },
  { value: "NOT_YET_RECRUITING", label: "Not yet recruiting" },
];

const PHASE_OPTIONS = [
  { value: "Phase 1", label: "Phase 1" },
  { value: "Phase 2", label: "Phase 2" },
  { value: "Phase 3", label: "Phase 3" },
  { value: "Phase 4", label: "Phase 4" },
];

const AGE_OPTIONS = [
  { value: "Child", label: "Child" },
  { value: "Adult", label: "Adult" },
  { value: "Older Adult", label: "Older Adult" },
];

interface FilterGroup {
  label: string;
  key: string;
  options: { value: string; label: string }[];
}

const FILTER_GROUPS: FilterGroup[] = [
  { label: "Status", key: "status", options: STATUS_OPTIONS },
  { label: "Phase", key: "phase", options: PHASE_OPTIONS },
  { label: "Age group", key: "ageGroup", options: AGE_OPTIONS },
];

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("pageToken");
    router.push(`/results?${params.toString()}`);
  }

  function clearAll() {
    const params = new URLSearchParams();
    const condition = searchParams.get("condition");
    const location = searchParams.get("location");
    if (condition) params.set("condition", condition);
    if (location) params.set("location", location);
    router.push(`/results?${params.toString()}`);
  }

  const activeFilters = FILTER_GROUPS.filter((g) => searchParams.has(g.key)).length;

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#111827] dark:text-[#EAEAF5]">Filters</h2>
        {activeFilters > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-[#6B7280] dark:text-[#8686A8] hover:text-[#111827] dark:hover:text-[#EAEAF5] flex items-center gap-1 transition-colors"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      {FILTER_GROUPS.map((group) => {
        const current = searchParams.get(group.key);
        return (
          <div key={group.key}>
            <h3 className="text-xs font-medium text-[#6B7280] dark:text-[#8686A8] uppercase tracking-wide mb-2.5">
              {group.label}
            </h3>
            <div className="flex flex-col gap-1">
              {group.options.map((opt) => {
                const active = current === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateFilter(group.key, opt.value)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      active
                        ? "bg-[#EFF6FF] dark:bg-[#0B1828] text-[#2563EB] dark:text-[#5B9BFF] font-medium"
                        : "text-[#374151] dark:text-[#EAEAF5] hover:bg-[#F9FAFB] dark:hover:bg-[#181820]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
