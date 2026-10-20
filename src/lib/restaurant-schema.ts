import { z } from "zod";
import type { NewRestaurant, Rating, Restaurant } from "@/types/restaurant";

export const restaurantFormSchema = z.object({
  name: z.string().trim().min(1, "Укажите название"),
  cuisine: z.string().trim().min(1, "Выберите или укажите кухню"),
  city: z.string().trim().min(1, "Укажите город"),
  visitedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Укажите дату визита"),
  rating: z
    .number()
    .int()
    .min(1, "Поставьте оценку")
    .max(5, "Поставьте оценку"),
  comment: z.string().trim().max(1000, "Не больше 1000 символов"),
});

export type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

export function toNewRestaurant(values: RestaurantFormValues): NewRestaurant {
  return {
    name: values.name.trim(),
    cuisine: values.cuisine.trim(),
    city: values.city.trim(),
    visitedAt: values.visitedAt,
    rating: values.rating as Rating, // диапазон 1–5 гарантирует схема
    comment: values.comment.trim() || undefined,
  };
}

export function toFormValues(restaurant: Restaurant): RestaurantFormValues {
  return {
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    city: restaurant.city,
    visitedAt: restaurant.visitedAt,
    rating: restaurant.rating,
    comment: restaurant.comment ?? "",
  };
}
