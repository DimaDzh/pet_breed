import React from "react";
import { FilterType } from "@/types";
import ThemeToggle from "./ThemeToggle";
import FilterButtons from "./FilterButtons";

interface HeaderProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedFilter, onFilterChange }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Pet Breed Explorer
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Discover amazing dog and cat breeds from around the world
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <FilterButtons
              selectedFilter={selectedFilter}
              onFilterChange={onFilterChange}
            />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
