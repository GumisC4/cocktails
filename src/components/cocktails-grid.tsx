import { useCallback, useState } from "react";

import { CocktailItem } from "@/components/cocktail-item.tsx";
import type { Cocktail } from "@/types.ts";

function getFavouritesFromStorage(): number[] {
  try {
    const data = localStorage.getItem("favourites");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsed = JSON.parse(data ?? "[]");
    return (Array.isArray(parsed) ? parsed : []) as number[];
  } catch {
    return [];
  }
}

function saveFavouritesToStorage(favourites: number[]) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

export function CocktailsGrid({ cocktails }: { cocktails: Cocktail[] }) {
  const [favourites, setFavourites] = useState<number[]>(() =>
    getFavouritesFromStorage(),
  );

  const toggleFavourite = useCallback((cocktailId: number) => {
    setFavourites((previous) => {
      const newFavourites = previous.includes(cocktailId)
        ? previous.filter((id) => id !== cocktailId)
        : [...previous, cocktailId];
      saveFavouritesToStorage(newFavourites);
      return newFavourites;
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {cocktails.map((cocktail) => (
        <CocktailItem
          cocktail={cocktail}
          isFavourite={favourites.includes(cocktail.id)}
          onFavouriteToggle={() => {
            toggleFavourite(cocktail.id);
          }}
          key={cocktail.id}
        />
      ))}
    </div>
  );
}
