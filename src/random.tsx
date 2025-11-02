import { useEffect } from "react";
import { useNavigate } from "react-router";

import type { ResponseData } from "@/types.ts";

export function RandomCocktail() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://cocktails.solvro.pl/api/v1/cocktails?page=1&perPage=1")
      .then(async (response) => {
        const data = (await response.json()) as ResponseData;
        const total = data.meta.total;
        const randomPage = Math.floor(Math.random() * total) + 1;
        return fetch(
          `https://cocktails.solvro.pl/api/v1/cocktails?page=${randomPage.toString()}&perPage=1`,
        );
      })
      .then(async (response) => {
        const data = (await response.json()) as ResponseData;
        const cocktailId = data.data[0].id;
        void navigate(`/cocktail/${cocktailId.toString()}`, { replace: true });
      })
      .catch((error: unknown) => {
        console.error("Failed to fetch random cocktail:", error);
        void navigate("/", { replace: true });
      });
  }, [navigate]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p>Finding a random cocktail...</p>
      </div>
    </div>
  );
}
