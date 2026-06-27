import { getProduct, type Product } from "@/lib/products";
import { ShopTheLook, type Hotspot } from "./ShopTheLook";

// "Shop the look" — the pieces styled in the editorial image, with
// hotspot positions (% of image box) placed over the model.
const look: { slug: string; x: number; y: number }[] = [
  { slug: "aviator-shearling-jacket-black", x: 50, y: 42 }, // jacket on the body
  { slug: "mk-signature-shoulder-vanilla", x: 30, y: 60 }, // bag at the hip
  { slug: "puma-rose-gold-sneakers", x: 56, y: 90 }, // shoes at the foot
];

export function Lookbook() {
  const products = look
    .map((l) => getProduct(l.slug))
    .filter((p): p is Product => Boolean(p));
  const hotspots: Hotspot[] = look.map(({ slug, x, y }) => ({ slug, x, y }));

  return (
    <section aria-label="Shop the look" className="bg-sand/50 py-20 lg:py-28">
      <ShopTheLook
        image="/products/jacket-aviator-1.jpeg"
        imageAlt="The winter edit — aviator shearling jacket styled with a signature bag and sneakers"
        products={products}
        hotspots={hotspots}
      />
    </section>
  );
}
