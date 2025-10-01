import { useState, useCallback, useMemo } from "react";
import { BreedData } from "@/lib/api";

interface UseSearchProps {
  initialData: BreedData[];
  searchFields?: (keyof BreedData)[];
}

export const useSearch = ({
  initialData,
  searchFields = ["name"],
}: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<BreedData[]>(initialData);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);

      if (!term.trim()) {
        setFilteredData(initialData);
        return;
      }

      const filtered = initialData.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(term.toLowerCase());
          }
          return false;
        });
      });

      setFilteredData(filtered);
    },
    [initialData, searchFields]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredData(initialData);
  }, [initialData]);

  const searchResults = useMemo(
    () => ({
      data: filteredData,
      count: filteredData.length,
      hasResults: filteredData.length > 0,
      isSearching: searchTerm.trim().length > 0,
    }),
    [filteredData, searchTerm]
  );

  return {
    searchTerm,
    searchResults,
    handleSearch,
    clearSearch,
    setFilteredData,
  };
};
