// Export common types
export * from "./common";

// Export cats types
export * from "./cats";

// Export dogs types
export * from "./dogs";

// Legacy types for backward compatibility
export type BreedType = "cats" | "dogs";
export type FilterType = "all" | "dogs" | "cats";
