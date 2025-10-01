"use client";

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import ErrorState from "@/components/ErrorState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import StatsBar from "@/components/StatsBar";
import BreedGrid from "@/components/BreedGrid";
import NoResults from "@/components/NoResults";
import { useBreeds } from "@/hooks/useBreeds";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BreedsPage() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const {
    filteredBreeds,
    selectedFilter,
    isLoading,
    error,
    refetch,
    onFilterChange,
    onReset,
  } = useBreeds(24);

  // Set initial filter from URL params
  useEffect(() => {
    if (filterParam && (filterParam === "cats" || filterParam === "dogs")) {
      onFilterChange(filterParam);
    }
  }, [filterParam, onFilterChange]);

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <Header selectedFilter={selectedFilter} onFilterChange={onFilterChange} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSkeleton count={12} />
        ) : filteredBreeds && filteredBreeds.length > 0 ? (
          <>
            <StatsBar
              count={filteredBreeds.length}
              filter={selectedFilter}
              onRefresh={refetch}
            />
            <BreedGrid breeds={filteredBreeds} />
          </>
        ) : (
          <NoResults onReset={onReset} />
        )}
      </main>
    </div>
  );
}
