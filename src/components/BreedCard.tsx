import { BreedImage, BreedType } from "@/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";

type Props = {
  id: string;
  name: string;
  image: BreedImage;
  breed: BreedType;
};

const BreedCard = ({ id, name, image, breed }: Props) => {
  const linkUrl = `/breeds/${breed}/${id}`;

  return (
    <Link href={linkUrl} className="group block">
      <section className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-800">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={image.url}
            alt={`${name} ${breed.toLowerCase()}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            priority={false}
          />

          {/* Breed Type Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                breed === "cats"
                  ? "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-500/30"
                  : "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30"
              }`}
            >
              {breed === "cats" ? "🐱 Cat" : "🐶 Dog"}
            </span>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {name}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            {/* View More Arrow */}
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
              <span className="mr-1">View Details</span>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Loading State Overlay (hidden by default) */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center opacity-0 transition-opacity duration-200 pointer-events-none">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </section>
    </Link>
  );
};

export default BreedCard;
