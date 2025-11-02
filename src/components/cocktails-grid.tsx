import { CocktailItem } from "@/components/cocktail-item.tsx";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty.tsx";
import { useFavourites } from "@/hooks/use-favourites.ts";
import type { Cocktail } from "@/types.ts";

export function CocktailsGrid({ cocktails }: { cocktails: Cocktail[] }) {
  const { toggleFavourite, isFavourite } = useFavourites();

  if (cocktails.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No cocktails found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your filters or search for something else.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {cocktails.map((cocktail) => (
        <CocktailItem
          cocktail={cocktail}
          isFavourite={isFavourite(cocktail.id)}
          onFavouriteToggle={() => {
            toggleFavourite(cocktail.id);
          }}
          key={cocktail.id}
        />
      ))}
    </div>
  );
}
