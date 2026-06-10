import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { categories, products } from "@/lib/shop-data";
import { ProductCard } from "@/components/site/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUXE — Considered objects for refined living" },
      { name: "description", content: "Premium watches, apparel, and home goods. Made to last." },
      { property: "og:title", content: "LUXE — Considered objects for refined living" },
      { property: "og:description", content: "Premium watches, apparel, and home goods. Made to last." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              New Autumn Collection
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Refined<br />
              <em className="not-italic text-accent">Living</em>, slowly made.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              A curated selection of considered objects built by craftspeople who care.
              Quiet luxury for the everyday.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                Explore stories
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { icon: Truck, label: "Free shipping", sub: "Orders $200+" },
                { icon: ShieldCheck, label: "2-year warranty", sub: "On all goods" },
                { icon: Sparkles, label: "Hand-finished", sub: "Small batch" },
              ].map((it) => (
                <div key={it.label}>
                  <it.icon className="h-5 w-5 text-accent" />
                  <dt className="mt-2 text-xs font-medium">{it.label}</dt>
                  <dd className="text-xs text-muted-foreground">{it.sub}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-lift">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
                alt="Heritage automatic watch on linen"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-xl bg-background/85 p-4 backdrop-blur-md">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Featured</p>
                  <p className="font-display text-lg">Heritage Automatic</p>
                </div>
                <Link
                  to="/shop"
                  className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground"
                >
                  $489
                </Link>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 hidden h-32 w-32 rounded-full bg-accent/10 blur-2xl lg:block" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Curated Collections</h2>
            <p className="mt-2 text-sm text-muted-foreground">Shop by category.</p>
          </div>
          <Link to="/shop" className="hidden text-sm text-foreground/70 hover:text-foreground sm:inline-flex sm:items-center sm:gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              to="/shop"
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2" : "aspect-square"
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display text-xl text-background">{c.name}</p>
                <p className="text-xs text-background/80">Shop now →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Featured & Essentials</h2>
            <p className="mt-2 text-sm text-muted-foreground">Quietly exceptional pieces.</p>
          </div>
          <Link to="/shop" className="hidden text-sm text-foreground/70 hover:text-foreground sm:inline-flex sm:items-center sm:gap-1">
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Stay inspired</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Join our newsletter for new arrivals, journal stories, and members-only releases.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent"
            />
            <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
