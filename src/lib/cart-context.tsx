import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as catalog, type Product } from "./shop-data";

export type CartItem = { productId: string; quantity: number };

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  detailed: (CartItem & { product: Product; lineTotal: number })[];
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "luxe.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items
      .map((i) => {
        const product = catalog.find((p) => p.id === i.productId);
        if (!product) return null;
        return { ...i, product, lineTotal: product.price * i.quantity };
      })
      .filter(Boolean) as (CartItem & { product: Product; lineTotal: number })[];

    const count = detailed.reduce((s, x) => s + x.quantity, 0);
    const subtotal = detailed.reduce((s, x) => s + x.lineTotal, 0);
    const shipping = subtotal === 0 ? 0 : subtotal >= 200 ? 0 : 15;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);

    return {
      items,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((v) => !v),
      add: (productId, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.productId === productId);
          if (existing)
            return prev.map((p) =>
              p.productId === productId ? { ...p, quantity: p.quantity + qty } : p,
            );
          return [...prev, { productId, quantity: qty }];
        }),
      remove: (productId) =>
        setItems((prev) => prev.filter((p) => p.productId !== productId)),
      setQty: (productId, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.productId !== productId)
            : prev.map((p) => (p.productId === productId ? { ...p, quantity: qty } : p)),
        ),
      clear: () => setItems([]),
      count,
      subtotal,
      shipping,
      tax,
      total,
      detailed,
    };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
