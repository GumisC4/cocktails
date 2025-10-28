import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { CocktailsList } from "@/components/cocktails-list.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import type { ResponseData } from "@/types.ts";

async function getCocktails(page = 1) {
  const response = await fetch(
    `https://cocktails.solvro.pl/api/v1/cocktails?page=${page.toString()}&perPage=15`,
  );
  const data = (await response.json()) as ResponseData;
  console.log(data);
  return data;
}

export function FrontPage() {
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: ["cocktails", page],
    queryFn: async () => getCocktails(page),
  });
  return (
    <div>
      <CocktailsList cocktails={query.data?.data ?? []} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPage((currentPage) => currentPage - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPage((currentPage) => currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
