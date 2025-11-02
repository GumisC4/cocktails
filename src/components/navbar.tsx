import { Github, Wine } from "lucide-react";
import { Link } from "react-router";

import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";

export function Navbar() {
  return (
    <header className="bg-background/60 sticky top-0 z-50 mb-4 w-full border-b backdrop-blur">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Wine className="text-primary h-6 w-6" />
            <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
              Cocktails
            </span>
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  All Cocktails
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/favourites"
                  className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Favourites
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/random"
                  className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Random Cocktail
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/GumisC4/cocktails"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="icon">
              {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
              <Github />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>

      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur md:hidden">
        <div className="container flex justify-center space-x-8 py-3">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            All Cocktails
          </Link>
          <Link
            to="/favourites"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Favourites
          </Link>
          <Link
            to="/random"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Random Cocktail
          </Link>
        </div>
      </div>
    </header>
  );
}
