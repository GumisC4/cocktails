import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import { CocktailDetail } from "@/components/cocktail-detail.tsx";
import { Navbar } from "@/components/navbar.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { FavouritesPage } from "@/favourites.tsx";

import { FrontPage } from "./frontpage.tsx";
import { RandomCocktail } from "./random.tsx";

const queryClient = new QueryClient();

export function App() {
  return (
    <div className="mb-8">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Navbar />

            <div className="container mx-auto max-w-7xl px-4">
              <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/cocktail/:id" element={<CocktailDetail />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/random" element={<RandomCocktail />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}
