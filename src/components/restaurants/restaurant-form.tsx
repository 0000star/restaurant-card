"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CuisineField } from "@/components/restaurants/cuisine-field";
import { FieldError } from "@/components/restaurants/field-error";
import { StarRating } from "@/components/restaurants/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { todayIsoDate } from "@/lib/date";
import {
  restaurantFormSchema,
  toNewRestaurant,
  type RestaurantFormValues,
} from "@/lib/restaurant-schema";
import type { NewRestaurant } from "@/types/restaurant";

interface RestaurantFormProps {
  cuisineOptions: string[];
  submitLabel: string;
  onSubmit: (restaurant: NewRestaurant) => void;
  initialValues?: RestaurantFormValues;
  resetOnSubmit?: boolean;
}

export function RestaurantForm({
  cuisineOptions,
  submitLabel,
  onSubmit,
  initialValues,
  resetOnSubmit = false,
}: RestaurantFormProps) {
  const [resetCount, setResetCount] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: initialValues ?? {
      name: "",
      cuisine: "",
      city: "",
      visitedAt: todayIsoDate(),
      rating: 0,
      comment: "",
    },
  });

  const submit = (values: RestaurantFormValues) => {
    onSubmit(toNewRestaurant(values));
    if (resetOnSubmit) {
      reset();
      setResetCount((count) => count + 1); // сбрасывает режим «Другая…» в CuisineField
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Название</Label>
          <Input id="name" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cuisine">Кухня</Label>
          <Controller
            control={control}
            name="cuisine"
            render={({ field }) => (
              <CuisineField
                key={resetCount}
                id="cuisine"
                value={field.value}
                options={cuisineOptions}
                onChange={field.onChange}
              />
            )}
          />
          <FieldError message={errors.cuisine?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Город</Label>
          <Input id="city" {...register("city")} />
          <FieldError message={errors.city?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visitedAt">Дата визита</Label>
          <Input id="visitedAt" type="date" {...register("visitedAt")} />
          <FieldError message={errors.visitedAt?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Оценка</Label>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <StarRating value={field.value} onChange={field.onChange} />
          )}
        />
        <FieldError message={errors.rating?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea id="comment" rows={3} {...register("comment")} />
        <FieldError message={errors.comment?.message} />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
