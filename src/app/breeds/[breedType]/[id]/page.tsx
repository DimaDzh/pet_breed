"use client";

import { useParams, useRouter } from "next/navigation";
import { BreedInfo } from "@/components/BreedInfo";
import { ImageGallery } from "@/components/ImageGallery";
import { BreedDetailSkeleton } from "@/components/BreedDetailSkeleton";
import { useBreedDetails, useBreedImages } from "@/hooks/useBreedDetails";
import { ArrowLeft } from "lucide-react";

export default function BreedDetailPage() {
  const params = useParams();
  const router = useRouter();

  const breedType = params.breedType as "dogs" | "cats";
  const id = params.id as string;

  const {
    data: breed,
    isLoading: isLoadingBreed,
    error: breedError,
  } = useBreedDetails(breedType, id);

  const {
    data: images = [],
    isLoading: isLoadingImages,
    error: imagesError,
  } = useBreedImages(breedType, id, 16);

  const isLoading = isLoadingBreed || isLoadingImages;
  const error = breedError || imagesError;

  if (isLoading) {
    return <BreedDetailSkeleton />;
  }

  if (error || !breed) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Breed not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sorry, we could not find the breed you are looking for.
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Breed information */}
      <div className="mb-8">
        <BreedInfo breed={breed} breedType={breedType} />
      </div>

      {/* Image gallery */}
      <ImageGallery images={images} breedName={breed.name} />
    </div>
  );
}
