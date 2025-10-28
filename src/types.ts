export interface Cocktail {
  id: number;
  name: string;
  category: string;
  glass: string;
  instructions: string;
  imageUrl: string;
  alcoholic: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface ResponseData {
  meta: Meta;
  data: Cocktail[];
}
