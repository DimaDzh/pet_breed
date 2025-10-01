import { BaseBreed, BreedImage } from "./common";

// Dog breed extending base breed
export interface DogBreed extends BaseBreed {
  id: number; // Dogs use numeric IDs
}

// Array of dog breeds
export type DogBreeds = DogBreed[];

// Dog breed with required image
export interface DogBreedWithImage extends DogBreed {
  image: BreedImage;
}

// Type guard to check if object is a dog breed
export const isDogBreed = (breed: unknown): breed is DogBreed => {
  return (
    typeof breed === "object" &&
    breed !== null &&
    "id" in breed &&
    "name" in breed &&
    typeof (breed as DogBreed).id === "number" &&
    typeof (breed as DogBreed).name === "string"
  );
};

// Type guard to check if dog breed has image
export const hasDogBreedImage = (
  breed: DogBreed
): breed is DogBreedWithImage => {
  return breed.image !== undefined && breed.image !== null;
};
