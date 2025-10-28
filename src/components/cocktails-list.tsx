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

export function CocktailsList({ cocktails }: { cocktails: Cocktail[] }) {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      {cocktails.map((cocktail) => {
        return (
          <Card key={cocktail.id}>
            <CardHeader>
              <CardTitle>{cocktail.name}</CardTitle>
              <CardDescription>{cocktail.category}</CardDescription>
              <CardAction>Card Action</CardAction>
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
