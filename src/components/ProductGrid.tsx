import { type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { RevealGroup, RevealItem } from "./Reveal";

export function ProductGrid({
  products,
  priorityCount = 0,
  trigger = "scroll",
}: {
  products: Product[];
  priorityCount?: number;
  trigger?: "scroll" | "mount";
}) {
  return (
    <RevealGroup
      trigger={trigger}
      className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((p, i) => (
        <RevealItem key={p.slug}>
          <ProductCard product={p} priority={i < priorityCount} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
