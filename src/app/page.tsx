"use client";

import Navbar from "@/components/Navbar";
import ErrorState from "@/components/ErrorState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import BreedSection from "@/components/BreedSection";
import { useHomeBreeds } from "@/hooks/useHomeBreeds";

export default function Home() {
  const { allBreeds, isLoading, error, refetch } = useHomeBreeds();

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <LoadingSkeleton count={12} />
        ) : (
          <BreedSection title="Featured Breeds" breeds={allBreeds} />
        )}
      </main>
    </main>
  );
}
