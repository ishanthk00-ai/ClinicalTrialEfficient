"use client";

const STATUS_CONFIG: Record<string, { label: string; dot: string; pill: string }> = {
  RECRUITING: {
    label: "Recruiting",
    dot: "bg-green-500",
    pill: "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/60",
  },
  ACTIVE_NOT_RECRUITING: {
    label: "Active, not recruiting",
    dot: "bg-yellow-500",
    pill: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/60",
  },
  COMPLETED: {
    label: "Completed",
    dot: "bg-gray-400 dark:bg-gray-600",
    pill: "bg-gray-100 dark:bg-[#222232] text-gray-600 dark:text-[#8686A8] border-gray-200 dark:border-[#222232]",
  },
  NOT_YET_RECRUITING: {
    label: "Not yet recruiting",
    dot: "bg-blue-500",
    pill: "bg-blue-50 dark:bg-[#0B1828] text-blue-600 dark:text-[#5B9BFF] border-blue-200 dark:border-[#0B1828]",
  },
  TERMINATED: {
    label: "Terminated",
    dot: "bg-red-400",
    pill: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/60",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    dot: "bg-gray-400 dark:bg-gray-600",
    pill: "bg-gray-100 dark:bg-[#222232] text-gray-500 dark:text-[#8686A8] border-gray-200 dark:border-[#222232]",
  },
  ENROLLING_BY_INVITATION: {
    label: "By invitation",
    dot: "bg-purple-500",
    pill: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/60",
  },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    dot: "bg-gray-400 dark:bg-gray-600",
    pill: "bg-gray-100 dark:bg-[#222232] text-gray-600 dark:text-[#8686A8] border-gray-200 dark:border-[#222232]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
