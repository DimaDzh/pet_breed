import { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { dogApiClient, catApiClient } from "@/lib/api";

interface BreedsLayoutProps {
  children: React.ReactNode;
}
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Pet Breeds - Explore Dogs & Cats | Pet Breed Explorer",
  description:
    "Discover and explore different dog and cat breeds. Find detailed information about pet breeds, their characteristics, temperaments, and find your perfect companion.",
  keywords: [
    "pet breeds",
    "dog breeds",
    "cat breeds",
    "pet explorer",
    "animal breeds",
    "dog characteristics",
    "cat characteristics",
    "pet adoption",
    "breed information",
    "pet companion",
  ].join(", "),
  openGraph: {
    title: "Pet Breeds - Explore Dogs & Cats",
    description:
      "Discover and explore different dog and cat breeds. Find your perfect pet companion with detailed breed information.",
    type: "website",
    siteName: "Pet Breed Explorer",
    images: [
      {
        url: "/api/placeholder/1200/630",
        width: 1200,
        height: 630,
        alt: "Pet Breeds Explorer - Dogs and Cats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Breeds - Explore Dogs & Cats",
    description:
      "Discover and explore different dog and cat breeds. Find your perfect pet companion.",
    images: ["/api/placeholder/1200/630"],
  },
  alternates: {
    canonical: `${baseUrl}/breeds`,
  },
};

interface ApiImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default async function BreedsLayout({ children }: BreedsLayoutProps) {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["dog-explore-image"],
      queryFn: async (): Promise<string> => {
        try {
          const response = await dogApiClient.get<ApiImage[]>(
            "/images/search?limit=1&has_breeds=1"
          );
          return response.data[0]?.url || "/api/placeholder/800/600";
        } catch (error) {
          console.error("Error fetching dog image:", error);
          return "/api/placeholder/800/600";
        }
      },
      staleTime: 10 * 60 * 1000,
    });

    await queryClient.prefetchQuery({
      queryKey: ["cat-explore-image"],
      queryFn: async (): Promise<string> => {
        try {
          const response = await catApiClient.get<ApiImage[]>(
            "/images/search?limit=1&has_breeds=1"
          );
          return response.data[0]?.url || "/api/placeholder/800/600";
        } catch (error) {
          console.error("Error fetching cat image:", error);
          return "/api/placeholder/800/600";
        }
      },
      staleTime: 10 * 60 * 1000,
    });
  } catch (error) {
    console.error("Error prefetching explore images:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
