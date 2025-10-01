import { useQuery } from "@tanstack/react-query";
import { dogApiClient, catApiClient } from "@/lib/api";

interface ApiImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const useExploreImages = () => {
  const dogImageQuery = useQuery({
    queryKey: ["dog-explore-image"],
    queryFn: async (): Promise<string> => {
      try {
        const response = await dogApiClient.get<ApiImage[]>(
          "/images/search?limit=1&has_breeds=1"
        );
        return response.data[0]?.url || "/api/placeholder/800/600";
      } catch (error) {
        console.error("Error fetching dog image:", error);
        // Fallback to a placeholder or default image
        return "/api/placeholder/800/600";
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  const catImageQuery = useQuery({
    queryKey: ["cat-explore-image"],
    queryFn: async (): Promise<string> => {
      try {
        const response = await catApiClient.get<ApiImage[]>(
          "/images/search?limit=1&has_breeds=1"
        );
        return response.data[0]?.url || "/api/placeholder/800/600";
      } catch (error) {
        console.error("Error fetching cat image:", error);
        // Fallback to a placeholder or default image
        return "/api/placeholder/800/600";
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  return {
    dogImageUrl: dogImageQuery.data,
    catImageUrl: catImageQuery.data,
    isLoadingDogImage: dogImageQuery.isLoading,
    isLoadingCatImage: catImageQuery.isLoading,
    dogImageError: dogImageQuery.error,
    catImageError: catImageQuery.error,
    refetchDogImage: dogImageQuery.refetch,
    refetchCatImage: catImageQuery.refetch,
  };
};
