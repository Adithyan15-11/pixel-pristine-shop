export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl">LUXE</div>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Considered objects for a refined life. Made to last, designed to be loved.
          </p>
        </div>
        {[
          { title: "Shop", links: ["New Arrivals", "Bestsellers", "Watches", "Apparel", "Accessories"] },
          { title: "Support", links: ["Contact", "Shipping", "Returns", "Size Guide", "FAQ"] },
          { title: "Company", links: ["About", "Journal", "Sustainability", "Press", "Careers"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/90">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} LUXE. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
