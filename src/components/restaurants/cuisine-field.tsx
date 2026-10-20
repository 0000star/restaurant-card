"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Значение пункта совпадает с подписью: Select показывает value как текст.
const CUSTOM_OPTION = "Другая…";

interface CuisineFieldProps {
  id: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function CuisineField({
  id,
  value,
  options,
  onChange,
}: CuisineFieldProps) {
  const [isCustom, setIsCustom] = useState(false);

  const handleSelect = (selected: string | null) => {
    if (selected === null) return;
    if (selected === CUSTOM_OPTION) {
      setIsCustom(true);
      onChange("");
      return;
    }
    setIsCustom(false);
    onChange(selected);
  };

  return (
    <div className="space-y-2">
      <Select
        value={isCustom ? CUSTOM_OPTION : value || null}
        onValueChange={handleSelect}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Выберите кухню" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
          <SelectItem value={CUSTOM_OPTION}>{CUSTOM_OPTION}</SelectItem>
        </SelectContent>
      </Select>
      {isCustom && (
        <Input
          placeholder="Название кухни"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}
