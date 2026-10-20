"use client";

import { useState } from "react";
import { AddRestaurantCard } from "@/components/restaurants/add-restaurant-card";
import { DeleteRestaurantDialog } from "@/components/restaurants/delete-restaurant-dialog";
import { EditRestaurantDialog } from "@/components/restaurants/edit-restaurant-dialog";
import { EmptyState } from "@/components/restaurants/empty-state";
import { RestaurantList } from "@/components/restaurants/restaurant-list";
import { useRestaurants } from "@/hooks/use-restaurants";
import { getCuisineOptions } from "@/lib/cuisines";
import type { Restaurant } from "@/types/restaurant";

export function RestaurantsView() {
  const {
    restaurants,
    isLoaded,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  } = useRestaurants();
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [deleting, setDeleting] = useState<Restaurant | null>(null);

  if (!isLoaded) {
    return <p className="text-muted-foreground">Загрузка…</p>;
  }

  const cuisineOptions = getCuisineOptions(restaurants);

  return (
    <div className="space-y-8">
      <AddRestaurantCard
        cuisineOptions={cuisineOptions}
        onAdd={addRestaurant}
      />
      {restaurants.length === 0 ? (
        <EmptyState />
      ) : (
        <RestaurantList
          restaurants={restaurants}
          onEdit={setEditing}
          onDelete={setDeleting}
        />
      )}
      <EditRestaurantDialog
        restaurant={editing}
        cuisineOptions={cuisineOptions}
        onSave={updateRestaurant}
        onClose={() => setEditing(null)}
      />
      <DeleteRestaurantDialog
        restaurant={deleting}
        onConfirm={deleteRestaurant}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
