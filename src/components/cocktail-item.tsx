import { Martini, Star } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
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
    <Link to={`/cocktail/${cocktail.id.toString()}`}>
      <Card
        className="border-muted h-60 bg-cover"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3), transparent), url(${cocktail.imageUrl ?? ""})`,
        }}
      >
        <CardHeader className="mt-auto">
          <CardTitle className="inline-flex items-center gap-2 text-white">
            {cocktail.name}{" "}
            {cocktail.alcoholic ? <Martini className="size-4" /> : null}
          </CardTitle>
          <CardDescription className="text-gray-200">
            {cocktail.category}
          </CardDescription>
          <CardAction>
            <Button
              className={cn(
                "border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:text-white",
                isFavourite
                  ? "bg-white/20 text-yellow-400 hover:bg-white/30 *:[svg]:fill-yellow-400"
                  : "bg-transparent hover:border-white/30 hover:bg-white/10",
              )}
              variant="ghost"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onFavouriteToggle();
              }}
            >
              <Star />
              {isFavourite ? "Unsave" : "Save"}
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
