import { DogBreed, CatBreed } from "@/types";
import Image from "next/image";

interface BreedInfoProps {
  breed: DogBreed | CatBreed;
  breedType: "dogs" | "cats";
}

export const BreedInfo = ({ breed, breedType }: BreedInfoProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Breed Image */}
        {breed.image && (
          <div className="flex-shrink-0">
            <div className="w-64 h-64 relative rounded-lg overflow-hidden">
              <Image
                src={breed.image.url}
                alt={breed.name}
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>
        )}

        {/* Breed Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {breed.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breed.origin && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Origin
                </h3>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {breed.origin}
                </p>
              </div>
            )}

            {breed.life_span && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Life Span
                </h3>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {breed.life_span} years
                </p>
              </div>
            )}

            {breed.weight && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Weight
                </h3>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {breed.weight.metric} kg ({breed.weight.imperial} lbs)
                </p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Type
              </h3>
              <p className="text-gray-900 dark:text-gray-100 mt-1 capitalize">
                {breedType.slice(0, -1)} {/* Remove 's' from dogs/cats */}
              </p>
            </div>
          </div>

          {breed.temperament && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                Temperament
              </h3>
              <div className="flex flex-wrap gap-2">
                {breed.temperament.split(",").map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {trait.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
