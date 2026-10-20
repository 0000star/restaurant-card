"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import {
  getRestaurantsSnapshot,
  getServerRestaurantsSnapshot,
  saveRestaurants,
  subscribeToRestaurants,
} from "@/lib/storage";
import type { NewRestaurant, Restaurant } from "@/types/restaurant";

export function useRestaurants() {
  const restaurants = useSyncExternalStore(
    subscribeToRestaurants,
    getRestaurantsSnapshot,
    getServerRestaurantsSnapshot,
  );
  const isLoaded = useIsClient();

  const addRestaurant = useCallback((input: NewRestaurant) => {
    const now = new Date().toISOString();
    const restaurant: Restaurant = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    saveRestaurants([restaurant, ...getRestaurantsSnapshot()]);
  }, []);
  const updateRestaurant = useCallback((id: string, input: NewRestaurant) => {
    const updatedAt = new Date().toISOString();
    saveRestaurants(
      getRestaurantsSnapshot().map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, ...input, updatedAt }
          : restaurant,
      ),
    );
  }, []);

  const deleteRestaurant = useCallback((id: string) => {
    saveRestaurants(
      getRestaurantsSnapshot().filter((restaurant) => restaurant.id !== id),
    );
  }, []);

  return {
    restaurants,
    isLoaded,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
}
