import React, { FC } from "react";

import BreedGrid from "./BreedGrid";
import { BreedData } from "@/lib/api";

interface BreedSectionProps {
  title: string;
  breeds: BreedData[];
}

const BreedSection: FC<BreedSectionProps> = ({ title, breeds }) => {
  return (
    <section className="mb-12">
      {breeds.length > 0 ? (
        <BreedGrid breeds={breeds} />
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No {title.toLowerCase()} available
          </p>
        </div>
      )}
    </section>
  );
};

export default BreedSection;
