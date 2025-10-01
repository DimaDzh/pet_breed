import { useQuery } from "@tanstack/react-query";
import { fetchAllBreeds, BreedData } from "@/lib/api";
import { FilterType } from "@/types";
import { useState, useMemo } from "react";

export const useBreeds = (limit: number = 24) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  const queryResult = useQuery({
    queryKey: ["breeds"],
    queryFn: () => fetchAllBreeds(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredBreeds = useMemo(() => {
    if (!queryResult.data) return [];

    return queryResult.data.filter((breed: BreedData) => {
      if (selectedFilter === "all") return true;
      return breed.breed === selectedFilter;
    });
  }, [queryResult.data, selectedFilter]);

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const handleReset = () => {
    setSelectedFilter("all");
    queryResult.refetch();
  };

  return {
    ...queryResult,
    breeds: queryResult.data,
    filteredBreeds,
    selectedFilter,
    onFilterChange: handleFilterChange,
    onReset: handleReset,
  };
};
