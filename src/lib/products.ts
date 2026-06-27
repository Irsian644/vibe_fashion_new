export type Category = "bags" | "dresses" | "jackets" | "accessories";

export type Variant = {
  name: string;
  value: string;
  hex?: string; // for color swatches
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // placeholder pricing until the client confirms real prices
  images: string[];
  colors?: Variant[];
  sizes?: string[];
  materials: string;
  description: string;
  details: string[];
  featured?: boolean;
  isNew?: boolean;
  tags: string[];
  // Optional — only set once the client provides real data. Left undefined,
  // no discounts, scarcity or ratings are shown anywhere on the site.
  compareAt?: number; // real "was" price for genuine markdowns
  stock?: number; // real on-hand count for low-stock messaging
  rating?: number; // real average review score
  reviews?: number; // real review count
};

export const CATEGORIES: { key: Category; label: string; blurb: string }[] = [
  { key: "bags", label: "Bags", blurb: "Designer-inspired & authentic" },
  { key: "dresses", label: "Dresses", blurb: "Soft, feminine, timeless" },
  { key: "jackets", label: "Jackets", blurb: "Statement outerwear" },
  { key: "accessories", label: "Accessories", blurb: "The finishing touch" },
];

export const products: Product[] = [
  {
    slug: "sienna-box-bag-black",
    name: "Sienna Box Bag",
    brand: "Zara",
    category: "bags",
    price: 30,
    images: ["/products/bag-box-black-1.jpeg"],
    colors: [
      { name: "Black", value: "black", hex: "#16130F" },
      { name: "Beige", value: "beige", hex: "#D9CBB7" },
    ],
    materials: "Smooth faux leather, polished gold-tone hardware, woven canvas strap.",
    description:
      "A structured saddle silhouette with a clean front flap and warm gold buckles — the kind of bag that lifts a jeans-and-tee day into something considered. Wear it cross-body for errands or short-strap for dinner.",
    details: [
      "Structured saddle body holds its shape",
      "Adjustable wide canvas + leather strap",
      "Magnetic flap closure",
      "Approx. 22 × 18 × 8 cm",
    ],
    featured: true,
    isNew: true,
    tags: ["zara", "crossbody", "saddle bag", "black bag"],
  },
  {
    slug: "guess-quilted-chain-flap",
    name: "Quilted Chain Flap",
    brand: "Guess",
    category: "bags",
    price: 55,
    images: ["/products/bag-guess-flap-1.jpeg", "/products/bag-guess-flap-2.jpeg"],
    colors: [{ name: "Black", value: "black", hex: "#16130F" }],
    materials: "Diamond-quilted faux leather, gold chain-and-leather strap, turn-lock logo clasp.",
    description:
      "100% original Guess. The diamond-quilted flap and gold-threaded chain do all the talking — a quiet nod to the classics at a fraction of the price. Compact enough for evenings, roomy enough for the essentials.",
    details: [
      "Authentic Guess — sold with care",
      "Interwoven gold chain + leather strap",
      "Signature turn-lock hardware",
      "Interior slip pocket",
    ],
    featured: true,
    tags: ["guess", "quilted", "chain bag", "shoulder bag"],
  },
  {
    slug: "sienna-saddle-bag-beige",
    name: "Sienna Saddle Bag",
    brand: "Zara",
    category: "bags",
    price: 30,
    images: ["/products/bag-saddle-beige-1.jpeg"],
    colors: [
      { name: "Beige", value: "beige", hex: "#D9CBB7" },
      { name: "Cognac", value: "cognac", hex: "#9C5A2C" },
      { name: "Black", value: "black", hex: "#16130F" },
    ],
    materials: "Soft faux leather, gold-tone feet & buckles, wide woven strap.",
    description:
      "The neutral that goes with everything. A warm beige saddle bag with gold detailing and a sporty woven strap — equal parts polished and easy. The hero of a capsule wardrobe.",
    details: [
      "Goes-with-everything beige tone",
      "Wide adjustable strap for comfort",
      "Protective metal base feet",
      "Approx. 22 × 18 × 8 cm",
    ],
    featured: true,
    isNew: true,
    tags: ["zara", "beige bag", "saddle bag", "neutral"],
  },
  {
    slug: "sienna-saddle-bag-cognac",
    name: "Sienna Saddle Bag",
    brand: "Zara",
    category: "bags",
    price: 30,
    images: ["/products/bag-saddle-cognac-1.jpeg"],
    colors: [
      { name: "Cognac", value: "cognac", hex: "#9C5A2C" },
      { name: "Beige", value: "beige", hex: "#D9CBB7" },
    ],
    materials: "Rich cognac faux leather, antique gold buckles, woven canvas strap.",
    description:
      "A richer take on our best-selling saddle — warm cognac leather with antique-gold buckles. The colour that makes cream, white and chocolate outfits sing through autumn and beyond.",
    details: [
      "Warm cognac tone",
      "Antique gold-tone hardware",
      "Adjustable woven strap",
      "Approx. 22 × 18 × 8 cm",
    ],
    tags: ["zara", "cognac", "brown bag", "saddle bag"],
  },
  {
    slug: "mk-pebbled-crossbody-cognac",
    name: "Fulton Pebbled Crossbody",
    brand: "Michael Kors",
    category: "bags",
    price: 65,
    images: ["/products/bag-mk-crossbody-1.jpeg", "/products/bag-mk-crossbody-2.jpeg"],
    colors: [{ name: "Luggage", value: "luggage", hex: "#9C5A2C" }],
    materials: "Pebbled leather, gold MK medallion, chain-link shoulder strap.",
    description:
      "100% original Michael Kors. Pebbled luggage leather with the signature MK medallion and a gold chain strap — a true investment piece that reads expensive because it is. Pristine, ready to be loved.",
    details: [
      "Authentic Michael Kors",
      "Pebbled leather, ages beautifully",
      "Gold-tone chain + leather strap",
      "Full-flap magnetic closure",
    ],
    featured: true,
    tags: ["michael kors", "mk", "crossbody", "leather bag"],
  },
  {
    slug: "mk-signature-shoulder-vanilla",
    name: "Signature Shoulder Bag",
    brand: "Michael Kors",
    category: "bags",
    price: 60,
    images: ["/products/bag-mk-vanilla-1.jpeg", "/products/bag-mk-vanilla-2.jpeg"],
    colors: [{ name: "Vanilla", value: "vanilla", hex: "#EDE6DA" }],
    materials: "Coated signature canvas, luggage leather trim, chunky gold chain.",
    description:
      "100% original Michael Kors, complete with tags and dust bag. The vanilla signature print with luggage trim and a bold gold chain — the shoulder bag that finishes every neutral outfit. A grail piece at a friendly price.",
    details: [
      "Authentic — arrives with tags & dust bag",
      "Signature coated canvas, easy to clean",
      "Chunky gold-tone chain handle",
      "Top zip closure",
    ],
    featured: true,
    isNew: true,
    tags: ["michael kors", "mk", "shoulder bag", "signature"],
  },
  {
    slug: "mk-monogram-shoulder-brown",
    name: "Monogram Shoulder Bag",
    brand: "Michael Kors",
    category: "bags",
    price: 60,
    images: ["/products/bag-mk-monogram-1.jpeg"],
    colors: [{ name: "Brown / Luggage", value: "brown", hex: "#5A3A22" }],
    materials: "Brown signature canvas, luggage leather panel, gold chain hardware.",
    description:
      "100% original Michael Kors. Deep brown monogram canvas with a luggage-leather front panel and gold chain detail — rich, warm and effortlessly designer. Pairs beautifully with cream and camel.",
    details: [
      "Authentic Michael Kors",
      "Brown monogram with leather panel",
      "Gold-tone chain detail",
      "Interior zip + slip pockets",
    ],
    tags: ["michael kors", "mk", "monogram", "brown bag"],
  },
  {
    slug: "amelie-lace-midi-dress",
    name: "Amélie Lace Midi Dress",
    brand: "Vibe Edit",
    category: "dresses",
    price: 38,
    images: ["/products/dress-lace-cream-1.jpeg"],
    colors: [{ name: "Cream", value: "cream", hex: "#F2ECE0" }],
    sizes: ["XS", "S", "M", "L"],
    materials: "Textured lace overlay, satin bow, lined bodice.",
    description:
      "A romantic cream midi with a ruffled off-shoulder neckline, a soft satin bow and a full lace skirt that moves with you. Made for garden parties, golden hour and the photos you'll keep forever.",
    details: [
      "Off-shoulder ruffle neckline",
      "Removable satin bow at the chest",
      "Fitted bodice, full midi skirt",
      "Fully lined for comfort",
    ],
    featured: true,
    isNew: true,
    tags: ["dress", "lace dress", "cream dress", "occasion"],
  },
  {
    slug: "polka-satin-midi-skirt",
    name: "Polka Satin Midi Skirt",
    brand: "Zara",
    category: "dresses",
    price: 25,
    images: ["/products/skirt-polka-satin-1.jpeg"],
    colors: [{ name: "Ivory / Black dot", value: "ivory", hex: "#F2ECE0" }],
    sizes: ["S", "M", "L"],
    materials: "Fluid satin, side patent-trim detail, concealed zip.",
    description:
      "An ivory satin midi covered in tiny black polka dots, with a fluid bias drape and a chic side detail. Tuck in a knit for the office or a silky cami for evening — it works overtime.",
    details: [
      "Authentic Zara",
      "Bias-cut fluid satin",
      "Side patent-trim accent",
      "Midi length, size L",
    ],
    tags: ["zara", "skirt", "satin", "polka dot"],
  },
  {
    slug: "aviator-shearling-jacket-black",
    name: "Aviator Shearling Jacket",
    brand: "Zara",
    category: "jackets",
    price: 80,
    images: [
      "/products/jacket-aviator-1.jpeg",
      "/products/jacket-aviator-2.jpeg",
      "/products/jacket-aviator-3.jpeg",
    ],
    colors: [{ name: "Black", value: "black", hex: "#16130F" }],
    sizes: ["XS", "S", "M", "Kids 8/9", "Kids 13/14"],
    materials: "Faux-leather shell, plush shearling collar & lining, antique zip hardware.",
    description:
      "The jacket that makes the whole outfit. A slouchy aviator in black faux-leather with a deep shearling collar and cosy lining — warm, oversized and impossibly cool over a mini dress or jeans. Available in women's and kids' sizing.",
    details: [
      "Authentic Zara",
      "Plush shearling collar & lining",
      "Asymmetric zip with belt detail",
      "Oversized, relaxed fit",
    ],
    featured: true,
    isNew: true,
    tags: ["zara", "jacket", "shearling", "aviator", "winter"],
  },
  {
    slug: "puma-rose-gold-sneakers",
    name: "Smash Sneakers — Rose Gold",
    brand: "Puma",
    category: "accessories",
    price: 45,
    images: ["/products/shoes-puma-1.jpeg"],
    colors: [{ name: "White / Rose gold", value: "rose-gold", hex: "#C7A867" }],
    sizes: ["37", "38", "39", "40"],
    materials: "Leather upper, metallic rose-gold side stripe, rubber cupsole.",
    description:
      "100% original Puma. Crisp white leather with a rose-gold formstrip and warm tonal sole — the everyday sneaker that quietly matches our beige bags and cream knits. Clean, comfortable, forever wearable.",
    details: [
      "Authentic Puma",
      "Leather upper, metallic rose-gold stripe",
      "Cushioned cupsole",
      "True to size",
    ],
    tags: ["puma", "sneakers", "shoes", "rose gold"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getByCategory(category?: string): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, limit);
}

export function getFeatured(limit = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function searchProducts(q: string): Product[] {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.brand, p.category, ...p.tags].join(" ").toLowerCase().includes(term),
  );
}

export function discountPct(p: Product): number | null {
  if (!p.compareAt || p.compareAt <= p.price) return null;
  return Math.round(((p.compareAt - p.price) / p.compareAt) * 100);
}
