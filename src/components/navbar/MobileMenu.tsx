import Link from "next/link";
import { ChevronDown, Menu as MenuIcon, X } from "lucide-react";
import Dialog from "../ui/Dialog";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  isBreedsDropdownOpen: boolean;
  toggleMobileMenu: () => void;
  toggleBreedsDropdown: () => void;
  closeMobileMenu: () => void;
}

const MobileMenu = ({
  isMobileMenuOpen,
  isBreedsDropdownOpen,
  toggleMobileMenu,
  toggleBreedsDropdown,
  closeMobileMenu,
}: MobileMenuProps) => {
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="bg-gray-100 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? "Close main menu" : "Open main menu"}
          </span>
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu Dialog */}
      <Dialog
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        title="Navigation Menu"
      >
        <div className="px-4 py-6 space-y-4">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={closeMobileMenu}
              className="bg-gray-100 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <Link
              href="/"
              className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 block px-4 py-3 rounded-md text-lg font-medium transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {/* Mobile Breeds Dropdown */}
            <div>
              <button
                onClick={toggleBreedsDropdown}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-4 py-3 rounded-md text-lg font-medium w-full text-left flex items-center justify-between transition-colors"
              >
                <span>Breeds</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isBreedsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isBreedsDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                  <Link
                    href="/breeds"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-4 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    All Breeds
                  </Link>
                  <Link
                    href="/breeds/dogs"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-4 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Dog Breeds
                  </Link>
                  <Link
                    href="/breeds/cats"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-4 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Cat Breeds
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MobileMenu;
