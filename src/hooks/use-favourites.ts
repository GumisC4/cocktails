import { useCallback, useState } from "react";

function getFavouritesFromStorage(): number[] {
  try {
    const data = localStorage.getItem("favourites");
    const parsed = JSON.parse(data ?? "[]") as unknown;
    return (Array.isArray(parsed) ? parsed : []) as number[];
  } catch {
    return [];
  }
}

function saveFavouritesToStorage(favourites: number[]) {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

export function useFavourites() {
  const [favourites, setFavourites] = useState<number[]>(() =>
    getFavouritesFromStorage(),
  );

  const addFavourite = useCallback((cocktailId: number) => {
    setFavourites((previous) => {
      if (previous.includes(cocktailId)) {
        return previous;
      }
      const newFavourites = [...previous, cocktailId];
      saveFavouritesToStorage(newFavourites);
      return newFavourites;
    });
  }, []);

  const removeFavourite = useCallback((cocktailId: number) => {
    setFavourites((previous) => {
      const newFavourites = previous.filter((id) => id !== cocktailId);
      saveFavouritesToStorage(newFavourites);
      return newFavourites;
    });
  }, []);

  const toggleFavourite = useCallback((cocktailId: number) => {
    setFavourites((previous) => {
      const newFavourites = previous.includes(cocktailId)
        ? previous.filter((id) => id !== cocktailId)
        : [...previous, cocktailId];
      saveFavouritesToStorage(newFavourites);
      return newFavourites;
    });
  }, []);

  const isFavourite = useCallback(
    (cocktailId: number) => favourites.includes(cocktailId),
    [favourites],
  );

  return {
    favourites,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    isFavourite,
  };
}
