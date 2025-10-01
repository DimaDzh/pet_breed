// Common breed image interface
export interface BreedImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

// Common weight measurement
export interface Weight {
  imperial: string;
  metric: string;
}

// Base breed interface with common properties
export interface BaseBreed {
  id: string | number;
  name: string;
  temperament?: string;
  origin?: string;
  life_span?: string;
  weight?: Weight;
  image?: BreedImage;
  reference_image_id?: string;
}

// Unified breed type for display
export interface DisplayBreed {
  id: string;
  name: string;
  image: BreedImage;
  breed: "cats" | "dogs";
  temperament?: string;
  origin?: string;
  life_span?: string;
}

// API response structure
export interface BreedApiResponse<T> {
  data?: T[];
  breeds?: T[];
  message?: string;
  status?: string;
}

// Type guard for breeds with images
export const hasBreedImage = <T extends BaseBreed>(
  breed: T
): breed is T & { image: BreedImage } => {
  return breed.image !== undefined && breed.image !== null;
};
