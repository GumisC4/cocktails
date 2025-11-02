import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { CocktailsGrid } from "@/components/cocktails-grid.tsx";
import { DynamicPagination } from "@/components/dynamic-pagination.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { ResponseData } from "@/types.ts";

async function getCocktails(page = 1, search = "") {
  const response = await fetch(
    `https://cocktails.solvro.pl/api/v1/cocktails?page=${page.toString()}&perPage=15${search ? `&name=%${search}%` : ""}`,
  );
  const data = (await response.json()) as ResponseData;
  return data;
}

export function FavouritesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = useQuery({
    queryKey: ["cocktails", page, search],
    queryFn: async () => getCocktails(page, search),
  });

  return (
    <div>
      <Input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder="Wyszukaj..."
      />
      <div></div>
      <div className="w-fit gap-4">
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
