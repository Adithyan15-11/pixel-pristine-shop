import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export function Navbar() {
  const { count, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/shop", label: "New Arrivals", search: { sort: "newest" as const } },
    { to: "/shop", label: "Collections" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-2xl tracking-wide">
            LUXE
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                className="text-sm text-foreground/70 transition hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <button className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-foreground sm:flex" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-foreground sm:flex" aria-label="Account">
            <User className="h-[18px] w-[18px]" />
          </button>
          <button
            onClick={open}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition hover:bg-secondary hover:text-foreground"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
