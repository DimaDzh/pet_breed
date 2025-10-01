"use client";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import Image from "next/image";
import {
  fetchAllBreeds,
  fetchDogBreeds,
  fetchCatBreeds,
  BreedData,
} from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchComponentProps {
  onSearchResults: (results: BreedData[]) => void;
  breedType?: "dogs" | "cats" | "all";
  placeholder?: string;
  className?: string;
}

export const SearchComponent = ({
  onSearchResults,
  breedType = "all",
  placeholder = "Search breeds...",
  className = "",
}: SearchComponentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the search term - waits 300ms after user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch all breeds based on type
  const { data: allBreeds = [], isLoading } = useQuery({
    queryKey: ["search-breeds", breedType],
    queryFn: async () => {
      if (breedType === "dogs") {
        return await fetchDogBreeds(50);
      } else if (breedType === "cats") {
        return await fetchCatBreeds(50);
      } else {
        return await fetchAllBreeds(100);
      }
    },
    staleTime: 10 * 60 * 1000,
  });

  // Filter breeds based on debounced search term for dropdown
  const filteredBreeds = debouncedSearchTerm.trim()
    ? allBreeds.filter((breed) =>
        breed.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : [];

  // Show immediate dropdown with current search term, but filter with debounced term
  const immediateFilteredBreeds = searchTerm.trim()
    ? allBreeds.filter((breed) =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setSelectedIndex(-1);
    setIsOpen(value.trim().length > 0);
  };

  // Handle breed selection
  const handleBreedSelect = (breed: BreedData) => {
    setSearchTerm(breed.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearchResults([breed]);
  };

  // Handle clear search
  const handleClear = () => {
    setSearchTerm("");
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearchResults(allBreeds);
  };

  // Check if we're waiting for debounce to complete
  const isDebouncing =
    searchTerm !== debouncedSearchTerm && searchTerm.trim().length > 0;

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredBreeds.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredBreeds.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredBreeds.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredBreeds[selectedIndex]) {
          handleBreedSelect(filteredBreeds[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter results when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      const results = allBreeds.filter((breed) =>
        breed.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      onSearchResults(results);
    } else {
      onSearchResults(allBreeds);
    }
  }, [debouncedSearchTerm, allBreeds, onSearchResults]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isLoading}
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {isOpen && immediateFilteredBreeds.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {isDebouncing && (
            <div className="px-4 py-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                <span>Searching...</span>
              </div>
            </div>
          )}
          {immediateFilteredBreeds.slice(0, 10).map((breed, index) => (
            <button
              key={breed.id}
              onClick={() => handleBreedSelect(breed)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none transition-colors ${
                index === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                {breed.image && (
                  <Image
                    src={breed.image.url}
                    alt={breed.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {breed.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {breed.breed}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {immediateFilteredBreeds.length > 10 && (
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600">
              Showing 10 of {immediateFilteredBreeds.length} results
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {isOpen &&
        searchTerm.trim() &&
        immediateFilteredBreeds.length === 0 &&
        !isLoading &&
        !isDebouncing && (
          <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4">
            <div className="text-center text-gray-500 dark:text-gray-400">
              No breeds found matching &ldquo;{searchTerm}&rdquo;
            </div>
          </div>
        )}

      {/* Loading state */}
      {isLoading && isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>Loading breeds...</span>
          </div>
        </div>
      )}
    </div>
  );
};
