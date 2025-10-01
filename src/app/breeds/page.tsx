"use client";

import Navbar from "@/components/Navbar";
import ExploreCard from "@/components/ExploreCard";
import { useExploreImages } from "@/hooks/useExploreImages";

export default function BreedsPage() {
  const { dogImageUrl, catImageUrl, isLoadingDogImage, isLoadingCatImage } =
    useExploreImages();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Explore Cards Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Choose Your Adventure
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ExploreCard
              title="Explore Dogs"
              breedType="dogs"
              description="Discover loyal companions with endless energy and unconditional love. From playful puppies to gentle giants, find your perfect canine friend."
              imageUrl={dogImageUrl}
              emoji="🐶"
              isLoading={isLoadingDogImage}
            />

            <ExploreCard
              title="Explore Cats"
              breedType="cats"
              description="Meet independent and graceful felines that bring charm and elegance to any home. From cuddly companions to majestic hunters."
              imageUrl={catImageUrl}
              emoji="🐱"
              isLoading={isLoadingCatImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
