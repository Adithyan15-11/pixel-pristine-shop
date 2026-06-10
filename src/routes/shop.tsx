import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, products } from "@/lib/shop-data";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — LUXE" },
      { name: "description", content: "Browse the full collection of premium goods." },
      { property: "og:title", content: "Shop — LUXE" },
      { property: "og:description", content: "Browse the full collection of premium goods." },
    ],
  }),
  component: ShopPage,
});

type Sort = "popularity" | "price-asc" | "price-desc" | "newest";

const PRICE_MIN = 0;
const PRICE_MAX = 600;

function ShopPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("popularity");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleCat = (id: string) =>
    setSelectedCats((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.categoryId)) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && p.stock <= 0) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "newest": return a.id < b.id ? 1 : -1;
        default: return b.popularity - a.popularity;
      }
    });
    return list;
  }, [selectedCats, maxPrice, inStockOnly, sort]);

  const clearAll = () => {
    setSelectedCats([]);
    setMaxPrice(PRICE_MAX);
    setInStockOnly(false);
  };

  const Filters = (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide">Category</h3>
          {(selectedCats.length > 0 || maxPrice < PRICE_MAX || inStockOnly) && (
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground">Reset</button>
          )}
        </div>
        <ul className="mt-4 space-y-2.5">
          {categories.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(c.id)}
                  onChange={() => toggleCat(c.id)}
                  className="h-4 w-4 rounded border-border text-accent accent-[oklch(0.72_0.16_55)]"
                />
                <span>{c.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {products.filter((p) => p.categoryId === c.id).length}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide">Price</h3>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>${PRICE_MIN}</span>
            <span>Up to <strong className="text-foreground">${maxPrice}</strong></span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 w-full accent-[oklch(0.72_0.16_55)]"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide">Availability</h3>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-[oklch(0.72_0.16_55)]"
          />
          In stock only
        </label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">All products</p>
        <h1 className="font-display text-4xl sm:text-5xl">The Collection</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} from independent makers and ateliers.
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>

        <div>
          <div className="flex items-center justify-between border-b border-border pb-4">
            <button
              onClick={() => setMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <div className="hidden text-sm text-muted-foreground lg:block">
              Showing {filtered.length} of {products.length}
            </div>
            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm outline-none focus:border-accent"
              >
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-20 text-center">
              <p className="font-display text-xl">No pieces match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening your selection.</p>
              <button onClick={clearAll} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>
            {Filters}
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              View {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
