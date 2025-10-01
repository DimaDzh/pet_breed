import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchDogBreeds, fetchCatBreeds } from "@/lib/api";

interface BreedTypeLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    breedType: string;
  }>;
}

// Generate static params for breed types
export function generateStaticParams() {
  return [{ breedType: "dogs" }, { breedType: "cats" }];
}

// Generate metadata for breed type pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ breedType: string }>;
}): Promise<Metadata> {
  const { breedType } = await params;
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  // Validate breed type
  if (breedType !== "dogs" && breedType !== "cats") {
    return {
      title: "Invalid Breed Type",
      description: "The requested breed type is not valid.",
    };
  }

  const breedDisplayName = breedType === "dogs" ? "Dogs" : "Cats";
  const animalType = breedType === "dogs" ? "dog" : "cat";

  const title = `${breedDisplayName} Breeds - Explore All ${breedDisplayName} Breed Types`;
  const description = `Discover all ${breedType} breeds with detailed information, images, and characteristics. Learn about different ${animalType} breeds, their temperaments, origins, and find your perfect ${animalType} companion.`;

  return {
    title,
    description,
    keywords: [
      breedType,
      `${animalType} breeds`,
      `${breedDisplayName.toLowerCase()} breed types`,
      "pet breeds",
      "animal breeds",
      `${animalType} characteristics`,
      `${animalType} temperament`,
      `${animalType} gallery`,
    ].join(", "),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Pet Breed Explorer",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseURL}/breeds/${breedType}`,
    },
  };
}

export default async function BreedTypeLayout({
  children,
  params,
}: BreedTypeLayoutProps) {
  const { breedType } = await params;

  if (breedType !== "dogs" && breedType !== "cats") {
    notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["breeds", breedType],
      queryFn: async () => {
        if (breedType === "dogs") {
          return await fetchDogBreeds(24);
        } else {
          return await fetchCatBreeds(24);
        }
      },
      staleTime: 5 * 60 * 1000,
    });
  } catch (error) {
    console.error(`Error prefetching ${breedType} breeds:`, error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="sr-only">{breedType === "dogs" ? "Dog" : "Cat"} Breeds</h1>
      {children}
    </HydrationBoundary>
  );
}
