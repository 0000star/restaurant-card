"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Restaurant } from "@/types/restaurant";

interface DeleteRestaurantDialogProps {
  restaurant: Restaurant | null;
  onConfirm: (id: string) => void;
  onClose: () => void;
}

export function DeleteRestaurantDialog({
  restaurant,
  onConfirm,
  onClose,
}: DeleteRestaurantDialogProps) {
  return (
    <AlertDialog
      open={restaurant !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
          <AlertDialogDescription>
            Запись «{restaurant?.name}» будет удалена без возможности
            восстановления.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => {
              if (restaurant) onConfirm(restaurant.id);
              onClose();
            }}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
