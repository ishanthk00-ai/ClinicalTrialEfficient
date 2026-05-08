"use client";

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; pill: string }
> = {
  RECRUITING: {
    label: "Recruiting",
    dot: "bg-green-500",
    pill: "bg-green-50 text-green-700 border-green-200",
  },
  ACTIVE_NOT_RECRUITING: {
    label: "Active, not recruiting",
    dot: "bg-yellow-500",
    pill: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  COMPLETED: {
    label: "Completed",
    dot: "bg-gray-400",
    pill: "bg-gray-100 text-gray-600 border-gray-200",
  },
  NOT_YET_RECRUITING: {
    label: "Not yet recruiting",
    dot: "bg-blue-500",
    pill: "bg-blue-50 text-blue-600 border-blue-200",
  },
  TERMINATED: {
    label: "Terminated",
    dot: "bg-red-400",
    pill: "bg-red-50 text-red-600 border-red-200",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    dot: "bg-gray-400",
    pill: "bg-gray-100 text-gray-500 border-gray-200",
  },
  ENROLLING_BY_INVITATION: {
    label: "By invitation",
    dot: "bg-purple-500",
    pill: "bg-purple-50 text-purple-600 border-purple-200",
  },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    dot: "bg-gray-400",
    pill: "bg-gray-100 text-gray-600 border-gray-200",
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
