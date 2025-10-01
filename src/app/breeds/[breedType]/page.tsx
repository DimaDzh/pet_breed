"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ErrorState from "@/components/ErrorState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import BreedGrid from "@/components/BreedGrid";
import NoResults from "@/components/NoResults";
import BackButton from "@/components/BackButton";
import { useQuery } from "@tanstack/react-query";
import { fetchCatBreeds, fetchDogBreeds } from "@/lib/api";

export default function BreedTypePage() {
  const params = useParams();
  const breedType = params.breedType as string;

  // Validate breed type
  const isValidBreedType = breedType === "dogs" || breedType === "cats";

  const {
    data: breeds,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["breeds", breedType],
    queryFn: () => {
      if (breedType === "dogs") {
        return fetchDogBreeds(24);
      } else if (breedType === "cats") {
        return fetchCatBreeds(24);
      }
      throw new Error("Invalid breed type");
    },
    enabled: isValidBreedType,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (!isValidBreedType) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Invalid Breed Type
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please select either dogs or cats.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  const breedDisplayName = breedType === "dogs" ? "Dogs" : "Cats";
  const breedEmoji = breedType === "dogs" ? "🐶" : "🐱";
  const gradientColors =
    breedType === "dogs"
      ? "from-blue-600 to-indigo-600"
      : "from-purple-600 to-pink-600";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <BackButton label="Back to Breeds" />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton count={12} />
        ) : breeds && breeds.length > 0 ? (
          <>
            {/* Stats Bar */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All {breedDisplayName} Breeds
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {breeds.length} breed{breeds.length !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            <BreedGrid breeds={breeds} />
          </>
        ) : (
          <NoResults onReset={() => refetch()} />
        )}
      </main>
    </div>
  );
}
