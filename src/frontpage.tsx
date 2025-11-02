import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { CocktailsGrid } from "@/components/cocktails-grid.tsx";
import { DynamicPagination } from "@/components/dynamic-pagination.tsx";
import { CocktailFilters } from "@/components/filters.tsx";
import type { CocktailCategory, CocktailGlass, ResponseData } from "@/types.ts";

interface Filters {
  name: string;
  category: CocktailCategory;
  glass: CocktailGlass;
  alcoholic: boolean | null;
}

async function getCocktails(page = 1, filters: Filters): Promise<ResponseData> {
  const parameters = new URLSearchParams({
    page: page.toString(),
    perPage: "15",
  });

  if (filters.name) {
    parameters.append("name", `%${filters.name}%`);
  }
  if (filters.category) {
    parameters.append("category", filters.category);
  }
  if (filters.glass) {
    parameters.append("glass", filters.glass);
  }
  if (filters.alcoholic !== null) {
    parameters.append("alcoholic", filters.alcoholic.toString());
  }

  const response = await fetch(
    `https://cocktails.solvro.pl/api/v1/cocktails?${parameters.toString()}`,
  );
  return (await response.json()) as ResponseData;
}

export function FrontPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    category: null,
    glass: null,
    alcoholic: null,
  });

  const query = useQuery({
    queryKey: ["cocktails", page, filters],
    queryFn: async () => getCocktails(page, filters),
    placeholderData: keepPreviousData,
  });

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <CocktailFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <div className="gap-4">
        <CocktailsGrid cocktails={query.data?.data ?? []} />
      </div>
      {query.data?.meta != null && (
        <DynamicPagination
          meta={query.data.meta}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
