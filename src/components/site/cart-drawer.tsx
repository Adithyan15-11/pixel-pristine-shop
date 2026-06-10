import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useCart, formatPrice } from "@/lib/cart-context";

export function CartDrawer() {
  const { isOpen, close, detailed, setQty, remove, subtotal, shipping, tax, total, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-lift transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl">Your Bag ({count})</h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg">Your bag is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">Discover thoughtful objects worth keeping.</p>
            <Link
              to="/shop"
              onClick={close}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="divide-y divide-border">
                {detailed.map((item) => (
                  <li key={item.productId} className="flex gap-4 py-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-24 w-24 flex-none rounded-md object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-medium">{item.product.title}</h4>
                          <p className="mt-0.5 text-xs text-muted-foreground">{formatPrice(item.product.price)} each</p>
                        </div>
                        <button
                          onClick={() => remove(item.productId)}
                          className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            onClick={() => setQty(item.productId, item.quantity - 1)}
                            aria-label="Decrease"
                            className="flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => setQty(item.productId, item.quantity + 1)}
                            aria-label="Increase"
                            className="flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold tabular-nums">{formatPrice(item.lineTotal)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border bg-secondary/40 px-5 py-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estimated tax</dt>
                  <dd className="tabular-nums">{formatPrice(tax)}</dd>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                onClick={close}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Checkout · {formatPrice(total)}
              </Link>
              <Link
                to="/shop"
                onClick={close}
                className="mt-2 block text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
