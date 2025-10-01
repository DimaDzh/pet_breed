import React from "react";
import { FilterType } from "@/types";
import { RefreshIcon } from "./icons";

interface StatsBarProps {
  count: number;
  filter: FilterType;
  onRefresh: () => void;
}

const StatsBar: React.FC<StatsBarProps> = ({ count, filter, onRefresh }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-gray-600 dark:text-gray-400">
        Showing {count} breed{count !== 1 ? "s" : ""}
        {filter !== "all" && ` of ${filter}`}
      </p>
      <button
        onClick={onRefresh}
        className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
      >
        <RefreshIcon className="w-4 h-4 mr-1.5" />
        Refresh
      </button>
    </div>
  );
};

export default StatsBar;
