import type { Restaurant } from "@/types/restaurant";

export const BASE_CUISINES = [
  "Американская",
  "Грузинская",
  "Индийская",
  "Итальянская",
  "Китайская",
  "Мексиканская",
  "Русская",
  "Тайская",
  "Французская",
  "Японская",
  "Кофейня / десерты",
];

// Базовый список + свои кухни из уже сохранённых записей.
export function getCuisineOptions(restaurants: Restaurant[]): string[] {
  const custom = restaurants
    .map((restaurant) => restaurant.cuisine)
    .filter((cuisine) => !BASE_CUISINES.includes(cuisine));
  return [...BASE_CUISINES, ...Array.from(new Set(custom)).sort()];
}
