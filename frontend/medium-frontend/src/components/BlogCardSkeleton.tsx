
const BlogCardSkeleton = () => {
  return (
    <div className="animate-pulse m-3 border-b-2 border-b-slate-300 pb-2 mb-2">
      {/* Avatar and meta info */}
      <div className="flex items-center gap-2 mb-2">
        {/* Skeleton Avatar */}
        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600" />

        {/* Name */}
        <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />

        {/* Dot */}
        <div className="w-2 h-2 bg-gray-400 rounded-full" />

        {/* Date */}
        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />

      {/* Content preview Skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
      </div>

      {/* Read time Skeleton */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24" />
    </div>
  );
};

export default BlogCardSkeleton;
