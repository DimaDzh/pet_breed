import React, { FC } from "react";
import { WarningIcon, RefreshIcon } from "./icons";

interface ErrorStateProps {
  error: Error | unknown;
  onRetry: () => void;
}

const ErrorState: FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <WarningIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Failed to load breeds
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <RefreshIcon className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
