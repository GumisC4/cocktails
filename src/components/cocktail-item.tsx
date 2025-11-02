import { Martini, Star } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import type { Cocktail } from "@/types.ts";

export function CocktailItem({
  cocktail,
  isFavourite,
  onFavouriteToggle,
}: {
  cocktail: Cocktail;
  isFavourite: boolean;
  onFavouriteToggle: () => void;
}) {
  return (
    <Card
      className="h-60 w-96 bg-cover"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent), url(${cocktail.imageUrl})`,
      }}
    >
      <CardHeader className="mt-auto">
        <CardTitle className="text-primary-foreground inline-flex items-center gap-2">
          {cocktail.name}{" "}
          {cocktail.alcoholic ? <Martini className="size-4" /> : null}
        </CardTitle>
        <CardDescription className="text-muted">
          {cocktail.category}
        </CardDescription>
        <CardAction>
          <Button
            className={
              isFavourite
                ? "*:[svg]:fill-primary"
                : "bg-accent/20 hover:bg-accent/30 backdrop-blur-lg"
            }
            variant={isFavourite ? "outline" : "default"}
            onClick={onFavouriteToggle}
          >
            <Star />
            {isFavourite ? "Unsave" : "Save"}
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
