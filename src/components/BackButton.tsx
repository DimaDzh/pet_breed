import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = "Back",
  className = "inline-flex items-center cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200",
}) => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={className}>
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </button>
  );
};

export default BackButton;
