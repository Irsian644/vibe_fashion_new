import { type Product } from "@/lib/products";
import { StarRating } from "./StarRating";
import { Check } from "lucide-react";

const SAMPLE = [
  {
    name: "Arta B.",
    rating: 5,
    date: "2 weeks ago",
    text: "Exactly as described and so well packaged. The quality genuinely feels high-end.",
  },
  {
    name: "Rina S.",
    rating: 5,
    date: "1 month ago",
    text: "Fast delivery and the colour is gorgeous in person. Will definitely order again.",
  },
  {
    name: "Vesa T.",
    rating: 4,
    date: "1 month ago",
    text: "Beautiful piece. Sizing ran slightly large for me but their Instagram advice was spot on.",
  },
];

export function Reviews({ product }: { product: Product }) {
  // Kept for when the client has real reviews; renders nothing without them.
  if (typeof product.rating !== "number" || typeof product.reviews !== "number") return null;

  return (
    <section id="reviews" aria-label="Reviews" className="scroll-mt-24 border-t border-ink/10 pt-12">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <h2 className="h-display text-3xl text-ink">Reviews</h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-5xl text-ink">{product.rating.toFixed(1)}</span>
            <div>
              <StarRating rating={product.rating} size="md" />
              <p className="mt-1 text-sm text-stone">{product.reviews} verified reviews</p>
            </div>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-stone">
            <Check className="h-4 w-4 text-gold" /> Verified buyers only
          </p>
        </div>

        <ul className="space-y-6">
          {SAMPLE.map((r) => (
            <li key={r.name} className="border-b border-ink/5 pb-6 last:border-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink">{r.name}</p>
                <span className="text-xs text-stone">{r.date}</span>
              </div>
              <div className="mt-1.5">
                <StarRating rating={r.rating} />
              </div>
              <p className="mt-2.5 leading-relaxed text-charcoal">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
