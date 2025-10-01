import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface MenuProps {
  isBreedsDropdownOpen: boolean;
  toggleBreedsDropdown: () => void;
  closeBreedsDropdown: () => void;
}

const Menu = ({
  isBreedsDropdownOpen,
  toggleBreedsDropdown,
  closeBreedsDropdown,
}: MenuProps) => {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <Link
          href="/"
          className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Home
        </Link>

        {/* Breeds Dropdown */}
        <div className="relative">
          <button
            onClick={toggleBreedsDropdown}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
          >
            <span>Breeds</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isBreedsDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isBreedsDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="py-1">
                <Link
                  href="/breeds"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  onClick={closeBreedsDropdown}
                >
                  All Breeds
                </Link>
                <Link
                  href="/breeds/dogs"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  onClick={closeBreedsDropdown}
                >
                  Dog Breeds
                </Link>
                <Link
                  href="/breeds/cats"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  onClick={closeBreedsDropdown}
                >
                  Cat Breeds
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
