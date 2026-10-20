import { StarRating } from "@/components/restaurants/star-rating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatVisitDate } from "@/lib/date";
import type { Restaurant } from "@/types/restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

export function RestaurantCard({
  restaurant,
  onEdit,
  onDelete,
}: RestaurantCardProps) {
  const { name, cuisine, city, visitedAt, rating, comment } = restaurant;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{name}</CardTitle>
          <StarRating value={rating} />
        </div>
        <CardDescription>
          {cuisine} · {city} · {formatVisitDate(visitedAt)}
        </CardDescription>
      </CardHeader>
      {comment && (
        <CardContent>
          <p className="text-sm whitespace-pre-line">{comment}</p>
        </CardContent>
      )}
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(restaurant)}>
          Изменить
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(restaurant)}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
