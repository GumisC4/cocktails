import { useQuery } from "@tanstack/react-query";
import { RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import type { CocktailCategory, CocktailGlass } from "@/types.ts";

interface Filters {
  name: string;
  category: CocktailCategory;
  glass: CocktailGlass;
  alcoholic: boolean | null;
}

interface CocktailFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

async function getCategories(): Promise<CocktailCategory[]> {
  const response = await fetch(
    "https://cocktails.solvro.pl/api/v1/cocktails/categories",
  );
  const data = (await response.json()) as { data: CocktailCategory[] };
  return data.data;
}

async function getGlasses(): Promise<CocktailGlass[]> {
  const response = await fetch(
    "https://cocktails.solvro.pl/api/v1/cocktails/glasses",
  );
  const data = (await response.json()) as { data: CocktailGlass[] };
  return data.data;
}

export function CocktailFilters({
  filters,
  onFiltersChange,
}: CocktailFiltersProps) {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const glassesQuery = useQuery({
    queryKey: ["glasses"],
    queryFn: getGlasses,
  });

  const defaultFilters: Filters = {
    name: "",
    category: null,
    glass: null,
    alcoholic: null,
  };

  const isChanged =
    filters.name !== defaultFilters.name ||
    filters.category !== defaultFilters.category ||
    filters.glass !== defaultFilters.glass ||
    filters.alcoholic !== defaultFilters.alcoholic;

  const handleFilterChange = (newFilters: Filters) => {
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="flex items-end gap-3">
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs">
            Name
          </Label>
          <div className="relative">
            <Input
              id="name"
              value={filters.name}
              onChange={(event) => {
                handleFilterChange({ ...filters, name: event.target.value });
              }}
              placeholder="Search by name..."
              className="pl-8"
            />
            <Search className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-medium">Category</div>
          <Select
            value={filters.category ?? "__all__"}
            onValueChange={(value) => {
              handleFilterChange({
                ...filters,
                category:
                  value === "__all__" ? null : (value as CocktailCategory),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All categories</SelectItem>
              {categoriesQuery.data?.map((category) =>
                category ? (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ) : null,
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-medium">Glass</div>
          <Select
            value={filters.glass ?? "__all__"}
            onValueChange={(value) => {
              handleFilterChange({
                ...filters,
                glass: value === "__all__" ? null : (value as CocktailGlass),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All glasses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All glasses</SelectItem>
              {glassesQuery.data?.map((glass) =>
                glass ? (
                  <SelectItem key={glass} value={glass}>
                    {glass}
                  </SelectItem>
                ) : null,
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-medium">Alcoholic</div>
          <Select
            value={
              filters.alcoholic === null
                ? "__all__"
                : filters.alcoholic
                  ? "true"
                  : "false"
            }
            onValueChange={(value) => {
              handleFilterChange({
                ...filters,
                alcoholic: value === "__all__" ? null : value === "true",
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All</SelectItem>
              <SelectItem value="true">Alcoholic</SelectItem>
              <SelectItem value="false">Non-alcoholic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button disabled={!isChanged} onClick={handleReset} variant="outline">
        <RotateCcw className="size-4" />
        Reset
      </Button>
    </div>
  );
}
