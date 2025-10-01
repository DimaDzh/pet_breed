import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface ExploreCardProps {
  title: string;
  breedType: "dogs" | "cats";
  description: string;
  imageUrl?: string;
  emoji: string;
  isLoading?: boolean;
}

const ExploreCard: FC<ExploreCardProps> = ({
  title,
  breedType,
  description,
  imageUrl,
  emoji,
  isLoading = false,
}) => {
  // Fallback image URLs
  const fallbackImages = {
    dogs: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&crop=faces",
    cats: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop&crop=faces",
  };

  const displayImageUrl = imageUrl || fallbackImages[breedType];
  return (
    <Link href={`/breeds/${breedType}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500">
                <svg
                  className="w-12 h-12 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <Image
              src={displayImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center mb-2">
              <span className="text-3xl mr-3">{emoji}</span>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  breedType === "cats"
                    ? "bg-purple-500/80 text-white"
                    : "bg-blue-500/80 text-white"
                }`}
              >
                {breedType === "cats" ? "Cats" : "Dogs"}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-200">
              {title}
            </h3>

            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {description}
            </p>

            {/* Call to Action */}
            <div className="flex items-center text-blue-200 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="mr-2">Explore Breeds</span>
              <svg
                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Border Animation */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300 ${
            breedType === "cats"
              ? "group-hover:border-purple-400"
              : "group-hover:border-blue-400"
          }`}
        />
      </div>
    </Link>
  );
};

export default ExploreCard;
