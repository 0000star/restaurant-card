import { RestaurantCard } from "@/components/restaurants/restaurant-card";
import type { Restaurant } from "@/types/restaurant";

interface RestaurantListProps {
  restaurants: Restaurant[];
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

export function RestaurantList({
  restaurants,
  onEdit,
  onDelete,
}: RestaurantListProps) {
  return (
    <ul className="space-y-4">
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <RestaurantCard
            restaurant={restaurant}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
