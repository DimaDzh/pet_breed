import { useQuery } from "@tanstack/react-query";
import { fetchCatBreeds, fetchDogBreeds, BreedData } from "@/lib/api";
import { useMemo } from "react";

export const useHomeBreeds = () => {
  const queryResult = useQuery({
    queryKey: ["home-breeds"],
    queryFn: async (): Promise<BreedData[]> => {
      const [cats, dogs] = await Promise.all([
        fetchCatBreeds(6),
        fetchDogBreeds(6),
      ]);

      // Combine and shuffle for random display
      const combined = [...cats, ...dogs];
      return combined.sort(() => Math.random() - 0.5);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const catBreeds = useMemo(() => {
    return queryResult.data?.filter((breed) => breed.breed === "cats") || [];
  }, [queryResult.data]);

  const dogBreeds = useMemo(() => {
    return queryResult.data?.filter((breed) => breed.breed === "dogs") || [];
  }, [queryResult.data]);

  return {
    ...queryResult,
    allBreeds: queryResult.data || [],
    catBreeds,
    dogBreeds,
  };
};
