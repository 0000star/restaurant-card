import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
}

const STARS = [1, 2, 3, 4, 5];

export function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div className="flex gap-1" aria-label={`Оценка: ${value} из 5`}>
      {STARS.map((star) => {
        const icon = (
          <Star
            className={cn(
              "size-5",
              star <= value
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground",
            )}
          />
        );
        if (!onChange) return <span key={star}>{icon}</span>;
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} из 5`}
            aria-pressed={star === value}
            onClick={() => onChange(star)}
            className="focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}
