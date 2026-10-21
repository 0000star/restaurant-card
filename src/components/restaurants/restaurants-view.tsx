"use client";

import { useState } from "react";
import { AddRestaurantCard } from "@/components/restaurants/add-restaurant-card";
import { DeleteRestaurantDialog } from "@/components/restaurants/delete-restaurant-dialog";
import { EditRestaurantDialog } from "@/components/restaurants/edit-restaurant-dialog";
import { EmptyState } from "@/components/restaurants/empty-state";
import { NoResults } from "@/components/restaurants/no-results";
import { RestaurantFiltersBar } from "@/components/restaurants/restaurant-filters-bar";
import { RestaurantList } from "@/components/restaurants/restaurant-list";
import { useRestaurants } from "@/hooks/use-restaurants";
import { getCuisineOptions } from "@/lib/cuisines";
import {
  ALL_CUISINES,
  DEFAULT_FILTERS,
  applyFilters,
  getUsedCuisines,
  type RestaurantFilters,
} from "@/lib/restaurant-filters";
import type { Restaurant } from "@/types/restaurant";

export function RestaurantsView() {
  const {
    restaurants,
    isLoaded,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  } = useRestaurants();
  const [filters, setFilters] = useState<RestaurantFilters>(DEFAULT_FILTERS);
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [deleting, setDeleting] = useState<Restaurant | null>(null);

  if (!isLoaded) {
    return <p className="text-muted-foreground">Загрузка…</p>;
  }

  const usedCuisines = getUsedCuisines(restaurants);
  // Если выбранной кухни больше нет в записях, откатываемся к «Все кухни».
  const activeFilters = usedCuisines.includes(filters.cuisine)
    ? filters
    : { ...filters, cuisine: ALL_CUISINES };
  const visible = applyFilters(restaurants, activeFilters);
  const total = restaurants.length;
  const cuisineOptions = getCuisineOptions(restaurants);

  return (
    <div className="space-y-8">
      <AddRestaurantCard
        cuisineOptions={cuisineOptions}
        onAdd={addRestaurant}
      />

      {total > 0 && (
        <RestaurantFiltersBar
          filters={activeFilters}
          cuisines={usedCuisines}
          shown={visible.length}
          total={total}
          onChange={setFilters}
        />
      )}

      {total === 0 && <EmptyState />}
      {total > 0 && visible.length === 0 && (
        <NoResults onReset={() => setFilters(DEFAULT_FILTERS)} />
      )}
      {visible.length > 0 && (
        <RestaurantList
          restaurants={visible}
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
