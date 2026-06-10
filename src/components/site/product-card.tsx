import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { useCart, formatPrice } from "@/lib/cart-context";
import type { Product } from "@/lib/shop-data";

export function ProductCard({ product }: { product: Product }) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    add(product.id, 1);
    setAdded(true);
    open();
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide">
            Sold out
          </span>
        )}
        {product.featured && !outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground">
            Featured
          </span>
        )}
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          aria-label={`Quick add ${product.title}`}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          <Plus className={`h-5 w-5 transition ${added ? "rotate-45" : ""}`} />
        </button>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-foreground">{product.title}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-current text-accent" />
            <span>{product.rating.toFixed(1)}</span>
            <span aria-hidden>·</span>
            <span>{outOfStock ? "Restocking" : `${product.stock} in stock`}</span>
          </div>
        </div>
        <p className="text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
