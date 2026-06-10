export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  stock: number;
  rating: number;
  featured?: boolean;
  popularity: number;
};

const u = (q: string, seed: number) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=80&sig=${seed}`;

export const categories: Category[] = [
  { id: "c1", name: "Watches", slug: "watches", image: u("photo-1523275335684-37898b6baf30", 1) },
  { id: "c2", name: "Apparel", slug: "apparel", image: u("photo-1489987707025-afc232f7ea0f", 2) },
  { id: "c3", name: "Accessories", slug: "accessories", image: u("photo-1473496169904-658ba7c44d8a", 3) },
  { id: "c4", name: "Home", slug: "home", image: u("photo-1505691938895-1758d7feb511", 4) },
  { id: "c5", name: "Essentials", slug: "essentials", image: u("photo-1517677208171-0bc6725a3e60", 5) },
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Heritage Automatic Watch",
    description: "Swiss-made automatic movement with sapphire crystal and Italian leather strap.",
    price: 489,
    image: u("photo-1523275335684-37898b6baf30", 11),
    categoryId: "c1",
    stock: 8,
    rating: 4.8,
    featured: true,
    popularity: 98,
  },
  {
    id: "p2",
    title: "Cashmere Crewneck Sweater",
    description: "Pure Mongolian cashmere, knitted in Italy. Cloud-soft, timeless silhouette.",
    price: 245,
    image: u("photo-1489987707025-afc232f7ea0f", 12),
    categoryId: "c2",
    stock: 14,
    rating: 4.7,
    featured: true,
    popularity: 87,
  },
  {
    id: "p3",
    title: "Bridle Leather Wallet",
    description: "Hand-stitched bridle leather wallet that ages beautifully with daily use.",
    price: 128,
    image: u("photo-1627123424574-724758594e93", 13),
    categoryId: "c3",
    stock: 22,
    rating: 4.9,
    featured: true,
    popularity: 92,
  },
  {
    id: "p4",
    title: "Acetate Optical Frames",
    description: "Lightweight Italian acetate frames with anti-reflective lenses.",
    price: 195,
    image: u("photo-1574258495973-f010dfbb5371", 14),
    categoryId: "c3",
    stock: 11,
    rating: 4.6,
    featured: true,
    popularity: 79,
  },
  {
    id: "p5",
    title: "Hand-Thrown Ceramic Vase",
    description: "Minimal stoneware vase from a small studio in Kyoto. Each piece unique.",
    price: 89,
    image: u("photo-1485955900006-10f4d324d411", 15),
    categoryId: "c4",
    stock: 6,
    rating: 4.5,
    featured: true,
    popularity: 71,
  },
  {
    id: "p6",
    title: "Travel Grooming Set",
    description: "Cedar wood toiletry kit with brass fittings and refillable glass bottles.",
    price: 165,
    image: u("photo-1556228720-195a672e8a03", 16),
    categoryId: "c5",
    stock: 9,
    rating: 4.7,
    featured: true,
    popularity: 83,
  },
  {
    id: "p7",
    title: "Linen Field Shirt",
    description: "Garment-washed European linen with mother of pearl buttons.",
    price: 138,
    image: u("photo-1602810318383-e386cc2a3ccf", 17),
    categoryId: "c2",
    stock: 0,
    rating: 4.4,
    popularity: 64,
  },
  {
    id: "p8",
    title: "Minimalist Desk Lamp",
    description: "Brushed brass and walnut desk lamp with warm dimmable LED.",
    price: 220,
    image: u("photo-1507473885765-e6ed057f782c", 18),
    categoryId: "c4",
    stock: 4,
    rating: 4.8,
    popularity: 75,
  },
  {
    id: "p9",
    title: "Field Chronograph",
    description: "Vintage-inspired chronograph with domed crystal and canvas strap.",
    price: 320,
    image: u("photo-1524592094714-0f0654e20314", 19),
    categoryId: "c1",
    stock: 12,
    rating: 4.6,
    popularity: 81,
  },
  {
    id: "p10",
    title: "Merino Travel Scarf",
    description: "Featherweight Australian merino scarf in soft heather tones.",
    price: 95,
    image: u("photo-1601370552761-3f1f5e8b9c0d", 20),
    categoryId: "c2",
    stock: 18,
    rating: 4.5,
    popularity: 60,
  },
  {
    id: "p11",
    title: "Leather Card Holder",
    description: "Slim full-grain leather card holder. Holds 6 cards plus folded notes.",
    price: 65,
    image: u("photo-1606760227091-3dd870d97f1d", 21),
    categoryId: "c3",
    stock: 30,
    rating: 4.6,
    popularity: 88,
  },
  {
    id: "p12",
    title: "Stoneware Pour-Over Set",
    description: "Hand-glazed pour-over dripper and matching server. Service for two.",
    price: 110,
    image: u("photo-1495474472287-4d71bcdd2085", 22),
    categoryId: "c4",
    stock: 7,
    rating: 4.7,
    popularity: 69,
  },
];
