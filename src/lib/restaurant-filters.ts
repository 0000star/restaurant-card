import type { Restaurant } from "@/types/restaurant";

export const ALL_CUISINES = "Все кухни";

export type SortKey = "date-desc" | "date-asc" | "rating-desc" | "rating-asc";

export interface RestaurantFilters {
  cuisine: string;
  minRating: number;
  sort: SortKey;
}

export const DEFAULT_FILTERS: RestaurantFilters = {
  cuisine: ALL_CUISINES,
  minRating: 0,
  sort: "date-desc",
};

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "date-desc", label: "Сначала новые" },
  { key: "date-asc", label: "Сначала старые" },
  { key: "rating-desc", label: "Сначала с высокой оценкой" },
  { key: "rating-asc", label: "Сначала с низкой оценкой" },
];

export const MIN_RATING_OPTIONS: { key: number; label: string }[] = [
  { key: 0, label: "Любая оценка" },
  { key: 3, label: "От 3 звёзд" },
  { key: 4, label: "От 4 звёзд" },
  { key: 5, label: "Только 5 звёзд" },
];

type Comparator = (a: Restaurant, b: Restaurant) => number;

const byDateDesc: Comparator = (a, b) =>
  b.visitedAt.localeCompare(a.visitedAt) ||
  b.createdAt.localeCompare(a.createdAt);

const byDateAsc: Comparator = (a, b) =>
  a.visitedAt.localeCompare(b.visitedAt) ||
  a.createdAt.localeCompare(b.createdAt);

const byRatingDesc: Comparator = (a, b) =>
  b.rating - a.rating || byDateDesc(a, b);

const byRatingAsc: Comparator = (a, b) =>
  a.rating - b.rating || byDateDesc(a, b);

const COMPARATORS: Record<SortKey, Comparator> = {
  "date-desc": byDateDesc,
  "date-asc": byDateAsc,
  "rating-desc": byRatingDesc,
  "rating-asc": byRatingAsc,
};

// Кухни, которые реально есть в записях.
export function getUsedCuisines(restaurants: Restaurant[]): string[] {
  return Array.from(new Set(restaurants.map((r) => r.cuisine))).sort((a, b) =>
    a.localeCompare(b, "ru"),
  );
}

// Исходный массив не меняется: filter() всегда возвращает новый.
export function applyFilters(
  restaurants: Restaurant[],
  filters: RestaurantFilters,
): Restaurant[] {
  return restaurants
    .filter(
      (r) => filters.cuisine === ALL_CUISINES || r.cuisine === filters.cuisine,
    )
    .filter((r) => r.rating >= filters.minRating)
    .sort(COMPARATORS[filters.sort]);
}
