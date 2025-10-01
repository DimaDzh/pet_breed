import React from "react";
import { SearchIcon } from "./icons";

interface NoResultsProps {
  onReset: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ onReset }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <SearchIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No breeds found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Try adjusting your filter or refresh to load new breeds.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoResults;
