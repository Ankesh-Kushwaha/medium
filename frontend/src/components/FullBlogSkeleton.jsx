import React from "react";

const FullBlogSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 m-2 p-3 border-b-slate border-b-2 animate-pulse">
      {/* Left side skeleton */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-24 bg-slate-300 rounded w-3/4"></div>
        <div className="h-12 bg-slate-200 rounded w-1/2"></div>
        <div className="space-y-3 mt-2">
          <div className="h-20 bg-slate-200 rounded w-full"></div>
          <div className="h-20 bg-slate-200 rounded w-11/12"></div>
          <div className="h-20 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>

      {/* Right side skeleton */}
      <div className="flex flex-row sm:flex-col items-center gap-2">
        <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
        <div className="h-6 bg-slate-300 rounded w-20"></div>
      </div>
    </div>
  );
};

export default FullBlogSkeleton;
