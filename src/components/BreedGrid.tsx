import React, { FC } from "react";
import BreedCard from "./BreedCard";
import { BreedData } from "@/lib/api";

interface BreedGridProps {
  breeds: BreedData[];
}

const BreedGrid: FC<BreedGridProps> = ({ breeds }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {breeds.map((breed) => (
        <BreedCard
          key={`${breed.breed}-${breed.id}`}
          id={breed.id}
          name={breed.name}
          image={breed.image}
          breed={breed.breed}
        />
      ))}
    </div>
  );
};

export default BreedGrid;
