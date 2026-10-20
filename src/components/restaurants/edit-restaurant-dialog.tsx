"use client";

import { RestaurantForm } from "@/components/restaurants/restaurant-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toFormValues } from "@/lib/restaurant-schema";
import type { NewRestaurant, Restaurant } from "@/types/restaurant";

interface EditRestaurantDialogProps {
  restaurant: Restaurant | null;
  cuisineOptions: string[];
  onSave: (id: string, input: NewRestaurant) => void;
  onClose: () => void;
}

export function EditRestaurantDialog({
  restaurant,
  cuisineOptions,
  onSave,
  onClose,
}: EditRestaurantDialogProps) {
  return (
    <Dialog
      open={restaurant !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Редактировать заведение</DialogTitle>
        </DialogHeader>
        {restaurant && (
          <RestaurantForm
            key={restaurant.id}
            cuisineOptions={cuisineOptions}
            initialValues={toFormValues(restaurant)}
            submitLabel="Сохранить изменения"
            onSubmit={(input) => {
              onSave(restaurant.id, input);
              onClose();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
