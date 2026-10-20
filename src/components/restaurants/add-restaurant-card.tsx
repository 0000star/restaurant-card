import { RestaurantForm } from "@/components/restaurants/restaurant-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewRestaurant } from "@/types/restaurant";

interface AddRestaurantCardProps {
  cuisineOptions: string[];
  onAdd: (restaurant: NewRestaurant) => void;
}

export function AddRestaurantCard({
  cuisineOptions,
  onAdd,
}: AddRestaurantCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Добавить заведение</CardTitle>
      </CardHeader>
      <CardContent>
        <RestaurantForm
          cuisineOptions={cuisineOptions}
          submitLabel="Сохранить"
          resetOnSubmit
          onSubmit={onAdd}
        />
      </CardContent>
    </Card>
  );
}
