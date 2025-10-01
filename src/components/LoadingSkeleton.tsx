import React, { FC } from "react";

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
