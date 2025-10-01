import React, { FC } from "react";
import { FilterType } from "@/types";

interface FilterButtonsProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterButtons: FC<FilterButtonsProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All Breeds" },
    { key: "dogs", label: "🐶 Dogs" },
    { key: "cats", label: "🐱 Cats" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            selectedFilter === filter.key
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
