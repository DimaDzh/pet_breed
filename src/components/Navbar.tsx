"use client";
import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { Logo, Menu, MobileMenu } from "./navbar";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBreedsDropdownOpen, setIsBreedsDropdownOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsBreedsDropdownOpen(false);
  };

  const toggleBreedsDropdown = () => {
    setIsBreedsDropdownOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsBreedsDropdownOpen(false);
  };

  const closeBreedsDropdown = () => {
    setIsBreedsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsBreedsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-background border-b bg-gray-50 dark:bg-gray-900 transition-colors  border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <Menu
            isBreedsDropdownOpen={isBreedsDropdownOpen}
            toggleBreedsDropdown={toggleBreedsDropdown}
            closeBreedsDropdown={closeBreedsDropdown}
          />

          <div className="flex items-center">
            <ThemeToggle />
          </div>

          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            isBreedsDropdownOpen={isBreedsDropdownOpen}
            toggleMobileMenu={toggleMobileMenu}
            toggleBreedsDropdown={toggleBreedsDropdown}
            closeMobileMenu={closeMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
