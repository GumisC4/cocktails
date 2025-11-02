import { useQuery } from "@tanstack/react-query";

import { CocktailsGrid } from "@/components/cocktails-grid.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty.tsx";
import { useFavourites } from "@/hooks/use-favourites.ts";
import type { ResponseData } from "@/types.ts";

async function getFavouritesCocktails(
  favouriteIds: number[],
): Promise<ResponseData> {
  if (favouriteIds.length === 0) {
    return {
      meta: {
        total: 0,
        perPage: 15,
        currentPage: 1,
        lastPage: 1,
        firstPage: 1,
        firstPageUrl: null,
        lastPageUrl: null,
        nextPageUrl: null,
        previousPageUrl: null,
      },
      data: [],
    };
  }

  const parameters = new URLSearchParams();
  for (const id of favouriteIds) {
    parameters.append("id[]", id.toString());
  }

  const response = await fetch(
    `https://cocktails.solvro.pl/api/v1/cocktails?${parameters.toString()}`,
  );

  return (await response.json()) as ResponseData;
}

export function FavouritesPage() {
  const { favourites } = useFavourites();

  const query = useQuery({
    queryKey: ["favourites", favourites],
    queryFn: async () => getFavouritesCocktails(favourites),
    enabled: favourites.length > 0,
  });

  if (favourites.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No favourites yet</EmptyTitle>
          <EmptyDescription>
            Start adding cocktails to your favourites!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">My Favourites</h1>
      <div className="gap-4">
        <CocktailsGrid cocktails={query.data?.data ?? []} />
      </div>
    </div>
  );
}
