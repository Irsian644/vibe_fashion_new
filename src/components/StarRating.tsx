import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviews,
  size = "sm",
}: {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
}) {
  const px = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={`${px} ${
              i < Math.round(rating) ? "fill-gold text-gold" : "fill-none text-beige"
            }`}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-xs text-stone">
          {rating.toFixed(1)} ({reviews})
        </span>
      )}
    </div>
  );
}
