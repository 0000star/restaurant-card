"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option<T> {
  key: T;
  label: string;
}

interface LabeledSelectProps<T extends string | number> {
  id: string;
  title: string;
  options: Option<T>[];
  value: T;
  onChange: (key: T) => void;
}

// Значение пункта = его подпись: Select показывает value как текст.
export function LabeledSelect<T extends string | number>({
  id,
  title,
  options,
  value,
  onChange,
}: LabeledSelectProps<T>) {
  const current = options.find((option) => option.key === value);

  const handleChange = (label: string | null) => {
    const option = options.find((item) => item.label === label);
    if (option) onChange(option.key);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-muted-foreground text-xs">
        {title}
      </Label>
      <Select value={current?.label ?? null} onValueChange={handleChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
