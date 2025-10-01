export const BreedDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button skeleton */}
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>

      {/* Breed info skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image skeleton */}
          <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>

          {/* Details skeleton */}
          <div className="flex-1">
            {/* Title skeleton */}
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Temperament skeleton */}
            <div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
