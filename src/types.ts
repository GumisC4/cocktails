export type CocktailCategory =
  | "Cocktail"
  | "Ordinary Drink"
  | "Punch / Party Drink"
  | "Shake"
  | "Other / Unknown"
  | "Cocoa"
  | "Shot"
  | "Coffee / Tea"
  | "Homemade Liqueur"
  | "Soft Drink"
  | null;

export type CocktailGlass =
  | "Highball glass"
  | "Old-fashioned glass"
  | "Cocktail glass"
  | "Copper Mug"
  | "Whiskey Glass"
  | "Collins glass"
  | "Pousse cafe glass"
  | "Champagne flute"
  | "Whiskey sour glass"
  | "Brandy snifter"
  | "White wine glass"
  | "Nick and Nora Glass"
  | "Hurricane glass"
  | "Coffee mug"
  | "Shot glass"
  | "Jar"
  | "Irish coffee cup"
  | "Punch bowl"
  | "Pitcher"
  | "Pint glass"
  | "Cordial glass"
  | "Beer mug"
  | "Margarita/Coupette glass"
  | "Beer pilsner"
  | "Beer Glass"
  | "Parfait glass"
  | "Wine Glass"
  | "Mason jar"
  | "Margarita glass"
  | "Martini Glass"
  | "Balloon Glass"
  | "Coupe Glass"
  | null;

export type IngredientType =
  | "Vodka"
  | "Gin"
  | "Rum"
  | "Spirit"
  | "Whisky"
  | "Syrup"
  | "Beer"
  | "Liqueur"
  | "Bitter"
  | "Brandy"
  | "Cider"
  | "Liquor"
  | "Beverage"
  | "Garnish"
  | "Sambuca"
  | "Whiskey"
  | "Liquer"
  | "Candy"
  | "Fruit"
  | "Soft Drink"
  | "Water"
  | "Mineral"
  | "Wine"
  | "Soda"
  | "Cream"
  | "Milk"
  | "Juice"
  | "Coffee"
  | "Sherry"
  | "Spice"
  | "Mix"
  | "Fortified Wine"
  | "Sauce"
  | "Tequila"
  | "Schnapps"
  | "Sugar"
  | "Stout"
  | "Alcopop"
  | "Cordial"
  | "Flower"
  | "Bitters"
  | "Aperitif"
  | "Cola"
  | "Rice wine"
  | "Sweet"
  | "Tea"
  | "Port"
  | "Vinegar"
  | "Confectionery"
  | "Vermouth"
  | "Mixer"
  | "Fruit Juice"
  | "Herb"
  | "Seasoning"
  | null;

export interface Ingredient {
  id: number;
  name: string;
  description: string | null;
  alcohol: boolean | null;
  type: IngredientType;
  percentage: number | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CocktailIngredient extends Ingredient {
  measure: string;
}

export interface Cocktail {
  id: number;
  name: string;
  instructions: string | null;
  alcoholic: boolean;
  category: CocktailCategory;
  glass: CocktailGlass;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  ingredients?: CocktailIngredient[];
}

export interface Meta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string | null;
  lastPageUrl: string | null;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface ResponseData<T = Cocktail> {
  meta: Meta;
  data: T[];
}

export interface SingleResponseData<T = Cocktail> {
  data: T;
}
