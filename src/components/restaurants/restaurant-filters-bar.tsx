"use client";

import { LabeledSelect } from "@/components/restaurants/labeled-select";
import { Button } from "@/components/ui/button";
import {
  ALL_CUISINES,
  DEFAULT_FILTERS,
  MIN_RATING_OPTIONS,
  SORT_OPTIONS,
  type RestaurantFilters,
} from "@/lib/restaurant-filters";

interface RestaurantFiltersBarProps {
  filters: RestaurantFilters;
  cuisines: string[];
  shown: number;
  total: number;
  onChange: (filters: RestaurantFilters) => void;
}

export function RestaurantFiltersBar({
  filters,
  cuisines,
  shown,
  total,
  onChange,
}: RestaurantFiltersBarProps) {
  const cuisineOptions = [ALL_CUISINES, ...cuisines].map((cuisine) => ({
    key: cuisine,
    label: cuisine,
  }));
  const isDefault =
    filters.cuisine === DEFAULT_FILTERS.cuisine &&
    filters.minRating === DEFAULT_FILTERS.minRating &&
    filters.sort === DEFAULT_FILTERS.sort;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <LabeledSelect
          id="filter-cuisine"
          title="Кухня"
          options={cuisineOptions}
          value={filters.cuisine}
          onChange={(cuisine) => onChange({ ...filters, cuisine })}
        />
        <LabeledSelect
          id="filter-rating"
          title="Оценка"
          options={MIN_RATING_OPTIONS}
          value={filters.minRating}
          onChange={(minRating) => onChange({ ...filters, minRating })}
        />
        <LabeledSelect
          id="filter-sort"
          title="Сортировка"
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(sort) => onChange({ ...filters, sort })}
        />
      </div>
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>
          Показано {shown} из {total}
        </span>
        {!isDefault && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            Сбросить
          </Button>
        )}
      </div>
    </div>
  );
}
