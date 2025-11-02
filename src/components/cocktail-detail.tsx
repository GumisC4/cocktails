import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Martini, Star } from "lucide-react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useFavourites } from "@/hooks/use-favourites.ts";
import type { SingleResponseData } from "@/types.ts";

async function getCocktail(id: string): Promise<SingleResponseData> {
  const response = await fetch(
    `https://cocktails.solvro.pl/api/v1/cocktails/${id}`,
  );
  return (await response.json()) as SingleResponseData;
}

export function CocktailDetail() {
  const { id } = useParams<{ id: string }>();
  const { toggleFavourite, isFavourite } = useFavourites();

  const query = useQuery({
    queryKey: ["cocktail", id],
    queryFn: async () => getCocktail(id ?? ""),
    enabled: Boolean(id),
  });

  if (query.isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p>Loading cocktail...</p>
        </div>
      </div>
    );
  }

  if (query.error != null || query.data?.data == null) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-2xl font-semibold">Error</h2>
        <p className="text-muted-foreground mb-4">Failed to load cocktail.</p>
        <Button
          onClick={() => {
            window.history.back();
          }}
          variant="ghost"
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
    );
  }

  const cocktail = query.data.data;

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <Button
        variant="ghost"
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeft />
        Back
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <div
            className="mb-6 aspect-square rounded-lg bg-cover bg-center"
            style={{
              backgroundImage:
                cocktail.imageUrl == null
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : `url(${cocktail.imageUrl})`,
            }}
          />
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{cocktail.name}</h1>
              <div className="text-muted-foreground flex items-center gap-2">
                <span>{cocktail.category}</span>
                {cocktail.alcoholic ? <Martini className="size-4" /> : null}
              </div>
            </div>
            <Button
              variant={isFavourite(cocktail.id) ? "default" : "outline"}
              size="sm"
              className="my-1 w-8 sm:w-auto"
              onClick={() => {
                toggleFavourite(cocktail.id);
              }}
            >
              <Star
                className={`size-4 ${isFavourite(cocktail.id) ? "fill-current" : ""}`}
              />
              <span className="hidden sm:inline">
                {isFavourite(cocktail.id) ? "Favourite" : "Add to favourites"}
              </span>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {cocktail.instructions != null && cocktail.instructions.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  {cocktail.instructions}
                </p>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Glass</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{cocktail.glass}</p>
            </CardContent>
          </Card>

          {cocktail.ingredients != null && cocktail.ingredients.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>
                  {cocktail.ingredients.length} składnik
                  {cocktail.ingredients.length === 1
                    ? ""
                    : cocktail.ingredients.length < 5
                      ? "i"
                      : "ów"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cocktail.ingredients.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {ingredient.imageUrl != null &&
                        ingredient.imageUrl.length > 0 ? (
                          <img
                            src={ingredient.imageUrl}
                            alt={ingredient.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        ) : null}
                        <div>
                          <p className="font-medium">{ingredient.name}</p>
                          {ingredient.description != null &&
                          ingredient.description.length > 0 ? (
                            <p className="text-muted-foreground line-clamp-2 text-xs">
                              {ingredient.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-medium">
                        {ingredient.measure}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span>{cocktail.category}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alcoholic:</span>
                <span>{cocktail.alcoholic ? "Yes" : "No"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Added:</span>
                <span>
                  {new Date(cocktail.createdAt).toLocaleDateString("pl-PL")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated:</span>
                <span>
                  {new Date(cocktail.updatedAt).toLocaleDateString("pl-PL")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
