export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#222232] rounded-xl p-5 shadow-sm animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-24 bg-gray-100 dark:bg-[#181820] rounded-full" />
        <div className="h-5 w-16 bg-gray-100 dark:bg-[#181820] rounded-full" />
      </div>
      <div className="h-4 bg-gray-100 dark:bg-[#181820] rounded mb-2 w-full" />
      <div className="h-4 bg-gray-100 dark:bg-[#181820] rounded mb-4 w-3/4" />
      <div className="h-3 bg-gray-100 dark:bg-[#181820] rounded mb-1.5 w-full" />
      <div className="h-3 bg-gray-100 dark:bg-[#181820] rounded mb-4 w-5/6" />
      <div className="pt-3 border-t border-[#F3F4F6] dark:border-[#191924]">
        <div className="h-3 w-32 bg-gray-100 dark:bg-[#181820] rounded" />
      </div>
    </div>
  );
}
