import { useQuery } from "@tanstack/react-query";
import {
  fetchDogBreedById,
  fetchCatBreedById,
  fetchDogImagesByBreed,
  fetchCatImagesByBreed,
} from "@/lib/api";
import { DogBreed, CatBreed } from "@/types";

// Hook to fetch breed details by ID
export const useBreedDetails = (breedType: "dogs" | "cats", id: string) => {
  return useQuery({
    queryKey: ["breed-details", breedType, id],
    queryFn: async (): Promise<DogBreed | CatBreed | null> => {
      if (breedType === "dogs") {
        return await fetchDogBreedById(id);
      } else {
        return await fetchCatBreedById(id);
      }
    },
    enabled: !!id && !!breedType,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to fetch breed images
export const useBreedImages = (
  breedType: "dogs" | "cats",
  id: string,
  limit: number = 12
) => {
  return useQuery({
    queryKey: ["breed-images", breedType, id, limit],
    queryFn: async (): Promise<string[]> => {
      if (breedType === "dogs") {
        return await fetchDogImagesByBreed(id, limit);
      } else {
        return await fetchCatImagesByBreed(id, limit);
      }
    },
    enabled: !!id && !!breedType,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
