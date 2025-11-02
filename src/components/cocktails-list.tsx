import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Cocktail } from "@/types.ts";

function setLocal(cocktails: number[]) {
  localStorage.setItem("favourites", JSON.stringify(cocktails));
}

function retrieveLocal(): number[] {
  try {
    const data = localStorage.getItem("favourites");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsed = JSON.parse(data ?? "[]");

    if (Array.isArray(parsed)) {
      return parsed as number[];
    }
  } catch (error) {
    console.error("Error parsing favourites from localStorage:", error);
  }
  setLocal([]);
  return [];
}

export function CocktailsList({ cocktails }: { cocktails: Cocktail[] }) {
  const [favourites, setFavourites] = useState<number[]>(retrieveLocal);

  function handleFavouritesToggle(cocktail: Cocktail) {
    setFavourites((previous) => {
      const newCocktails: number[] = [];
      if (previous.includes(cocktail.id)) {
        newCocktails.push(...previous.filter((c) => c !== cocktail.id));
      } else {
        newCocktails.push(...previous, cocktail.id);
      }
      setLocal(newCocktails);
      return newCocktails;
    });
  }

  return (
    <div className="flex max-w-xl flex-col gap-4">
      {cocktails.map((cocktail) => {
        return (
          <Card key={cocktail.id}>
            <CardHeader>
              <CardTitle>{cocktail.name}</CardTitle>
              <CardDescription>{cocktail.category}</CardDescription>
              <CardAction>
                <Button
                  onClick={() => {
                    handleFavouritesToggle(cocktail);
                  }}
                  variant={
                    favourites.includes(cocktail.id) ? "outline" : "default"
                  }
                >
                  <Star />
                  Favourites
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <img src={cocktail.imageUrl} alt={cocktail.name} />
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
