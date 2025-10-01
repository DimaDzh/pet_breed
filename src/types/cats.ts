import { BaseBreed, BreedImage } from "./common";

// Cat breed extending base breed
export interface CatBreed extends BaseBreed {
  id: string; // Cats use string IDs
}

// Array of cat breeds
export type CatBreeds = CatBreed[];

// Cat breed with required image
export interface CatBreedWithImage extends CatBreed {
  image: BreedImage;
}

// Type guard to check if object is a cat breed
export const isCatBreed = (breed: unknown): breed is CatBreed => {
  return (
    typeof breed === "object" &&
    breed !== null &&
    "id" in breed &&
    "name" in breed &&
    typeof (breed as CatBreed).id === "string" &&
    typeof (breed as CatBreed).name === "string"
  );
};

// Type guard to check if cat breed has image
export const hasCatBreedImage = (
  breed: CatBreed
): breed is CatBreedWithImage => {
  return breed.image !== undefined && breed.image !== null;
};
