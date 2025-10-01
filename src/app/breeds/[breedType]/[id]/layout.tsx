import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import {
  fetchDogBreedById,
  fetchCatBreedById,
  fetchDogImagesByBreed,
  fetchCatImagesByBreed,
  fetchDogBreeds,
  fetchCatBreeds,
} from "@/lib/api";

export async function generateStaticParams() {
  try {
    const [dogBreeds, catBreeds] = await Promise.all([
      fetchDogBreeds(10),
      fetchCatBreeds(10),
    ]);

    const params = [];

    for (const breed of dogBreeds) {
      params.push({
        breedType: "dogs" as const,
        id: breed.id,
      });
    }

    // Add cat breed params
    for (const breed of catBreeds) {
      params.push({
        breedType: "cats" as const,
        id: breed.id,
      });
    }

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

interface BreedLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    breedType: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ breedType: string; id: string }>;
}): Promise<Metadata> {
  const { breedType, id } = await params;

  if (breedType !== "dogs" && breedType !== "cats") {
    return {
      title: "Breed Not Found",
      description: "The requested breed could not be found.",
    };
  }

  const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    let breed;
    if (breedType === "dogs") {
      breed = await fetchDogBreedById(id);
    } else {
      breed = await fetchCatBreedById(id);
    }

    if (!breed) {
      return {
        title: "Breed Not Found",
        description: "The requested breed could not be found.",
      };
    }

    const breedTypeName = breedType === "dogs" ? "Dog" : "Cat";
    const title = `${breed.name} - ${breedTypeName} Breed Details`;
    const description = breed.temperament
      ? `Learn about the ${breed.name} ${breedType.slice(
          0,
          -1
        )} breed. Temperament: ${breed.temperament}. ${
          breed.origin ? `Origin: ${breed.origin}.` : ""
        }`
      : `Discover everything about the ${breed.name} ${breedType.slice(
          0,
          -1
        )} breed, including characteristics, origin, and gallery of images.`;

    return {
      title,
      description,
      keywords: [
        breed.name,
        breedType.slice(0, -1),
        "breed",
        "pet",
        "animal",
        ...(breed.temperament
          ? breed.temperament.split(",").map((t) => t.trim())
          : []),
        ...(breed.origin ? [breed.origin] : []),
      ].join(", "),
      alternates: {
        canonical: `${baseURL}/breeds/${breedType}/${id}`,
      },
      openGraph: {
        title,
        description,
        type: "article",
        images: breed.image
          ? [
              {
                url: breed.image.url,
                width: breed.image.width,
                height: breed.image.height,
                alt: `${breed.name} ${breedType.slice(0, -1)}`,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: breed.image ? [breed.image.url] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Breed Details",
      description:
        "Learn about different pet breeds and their characteristics.",
    };
  }
}

export default async function BreedLayout({
  children,
  params,
}: BreedLayoutProps) {
  const { breedType, id } = await params;

  if (breedType !== "dogs" && breedType !== "cats") {
    notFound();
  }
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["breed-details", breedType, id],
      queryFn: async () => {
        if (breedType === "dogs") {
          return await fetchDogBreedById(id);
        } else {
          return await fetchCatBreedById(id);
        }
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });

    await queryClient.prefetchQuery({
      queryKey: ["breed-images", breedType, id, 16],
      queryFn: async () => {
        if (breedType === "dogs") {
          return await fetchDogImagesByBreed(id, 16);
        } else {
          return await fetchCatImagesByBreed(id, 16);
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const breedData = queryClient.getQueryData([
      "breed-details",
      breedType,
      id,
    ]);
    if (!breedData) {
      notFound();
    }
  } catch (error) {
    console.error("Error prefetching breed data:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="bg-gray-50 dark:bg-gray-900">{children}</section>
    </HydrationBoundary>
  );
}
