export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#222232] rounded-2xl p-5 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <div className="skeleton-line h-5 w-24 rounded-full" />
        <div className="skeleton-line h-5 w-16 rounded-full" />
      </div>
      <div className="skeleton-line h-4 rounded mb-2 w-full" />
      <div className="skeleton-line h-4 rounded mb-4 w-3/4" />
      <div className="skeleton-line h-3 rounded mb-1.5 w-full" />
      <div className="skeleton-line h-3 rounded mb-4 w-5/6" />
      <div className="pt-3 border-t border-[#F3F4F6] dark:border-[#191924]">
        <div className="skeleton-line h-3 w-32 rounded" />
      </div>
    </div>
  );
}
