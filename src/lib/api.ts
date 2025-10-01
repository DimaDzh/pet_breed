import axios from "axios";
import { DogBreed, CatBreed, DisplayBreed } from "@/types";

// Dog API client
export const dogApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOG_API || "https://api.thedogapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Cat API client
export const catApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAT_API || "https://api.thecatapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Dog API interceptor - add API key if available
dogApiClient.interceptors.request.use(
  (config) => {
    const dogApiKey = process.env.NEXT_PUBLIC_DOG_API_KEY;
    if (dogApiKey) {
      config.headers["x-api-key"] = dogApiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Cat API interceptor - add API key if available
catApiClient.interceptors.request.use(
  (config) => {
    const catApiKey = process.env.NEXT_PUBLIC_CAT_API_KEY;
    if (catApiKey) {
      config.headers["x-api-key"] = catApiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Re-export the simplified breed data type for API usage
export type BreedData = DisplayBreed;

// Image API response interface
interface ImageApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

// Fetch dog breeds with images
export const fetchDogBreeds = async (
  limit: number = 12
): Promise<BreedData[]> => {
  try {
    const response = await dogApiClient.get<DogBreed[]>(
      `/breeds?limit=${limit}&has_breeds=1`
    );
    return response.data
      .filter((breed) => breed.image)
      .map((breed) => ({
        id: breed.id.toString(),
        name: breed.name,
        image: breed.image!,
        breed: "dogs" as const,
      }));
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw new Error("Failed to fetch dog breeds");
  }
};

// Fetch cat breeds with images
export const fetchCatBreeds = async (
  limit: number = 12
): Promise<BreedData[]> => {
  try {
    const response = await catApiClient.get<CatBreed[]>(
      `/breeds?limit=${limit}&has_breeds=1`
    );
    return response.data
      .filter((breed) => breed.image)
      .map((breed) => ({
        id: breed.id,
        name: breed.name,
        image: breed.image!,
        breed: "cats" as const,
      }));
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    throw new Error("Failed to fetch cat breeds");
  }
};

// Fetch all breeds (dogs and cats combined)
export const fetchAllBreeds = async (
  limit: number = 24
): Promise<BreedData[]> => {
  try {
    const halfLimit = Math.floor(limit / 2);
    const [dogBreeds, catBreeds] = await Promise.all([
      fetchDogBreeds(halfLimit),
      fetchCatBreeds(halfLimit),
    ]);

    // Shuffle the combined array for variety
    const combined = [...dogBreeds, ...catBreeds];
    return combined.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("Error fetching all breeds:", error);
    throw new Error("Failed to fetch breeds");
  }
};

// Fetch single dog breed by ID
export const fetchDogBreedById = async (
  id: string
): Promise<DogBreed | null> => {
  try {
    const response = await dogApiClient.get<DogBreed>(`/breeds/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dog breed by ID:", error);
    return null;
  }
};

// Fetch single cat breed by ID
export const fetchCatBreedById = async (
  id: string
): Promise<CatBreed | null> => {
  try {
    const response = await catApiClient.get<CatBreed>(`/breeds/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cat breed by ID:", error);
    return null;
  }
};

// Fetch dog images by breed
export const fetchDogImagesByBreed = async (
  breedId: string,
  limit: number = 12
): Promise<string[]> => {
  try {
    const response = await dogApiClient.get<ImageApiResponse[]>(
      `/images/search?breed_ids=${breedId}&limit=${limit}`
    );
    return response.data.map((item) => item.url);
  } catch (error) {
    console.error("Error fetching dog images:", error);
    return [];
  }
};

// Fetch cat images by breed
export const fetchCatImagesByBreed = async (
  breedId: string,
  limit: number = 12
): Promise<string[]> => {
  try {
    const response = await catApiClient.get<ImageApiResponse[]>(
      `/images/search?breed_ids=${breedId}&limit=${limit}`
    );
    return response.data.map((item) => item.url);
  } catch (error) {
    console.error("Error fetching cat images:", error);
    return [];
  }
};
