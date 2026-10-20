export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  address?: string;
  visitedAt: string; // YYYY-MM-DD
  rating: Rating;
  comment?: string;
  averageCheck?: number; // рубли
  favoriteDishes?: string[];
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

export type NewRestaurant = Omit<Restaurant, "id" | "createdAt" | "updatedAt">;
