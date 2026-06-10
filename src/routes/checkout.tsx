import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, CreditCard, Truck, ShieldCheck, PackageCheck } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart-context";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — LUXE" },
      { name: "description", content: "Secure checkout." },
    ],
  }),
  component: CheckoutPage,
});

type Step = 0 | 1 | 2 | 3;
const stepLabels = ["Shipping", "Payment", "Review", "Confirmation"];

function CheckoutPage() {
  const { detailed, subtotal, shipping, tax, total, clear, count } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [orderId, setOrderId] = useState<string>("");

  const [ship, setShip] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", zip: "", country: "United States",
  });
  const [pay, setPay] = useState({ method: "card", card: "", name: "", exp: "", cvc: "" });

  if (count === 0 && step < 3) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a few things before checking out.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">
          Shop the collection
        </Link>
      </div>
    );
  }

  const placeOrder = () => {
    const id = "LX-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    setStep(3);
    clear();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl">Checkout</h1>

      {/* Stepper */}
      <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        {stepLabels.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  done ? "bg-accent text-accent-foreground" : active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={active ? "font-medium" : "text-muted-foreground"}>{label}</span>
              {i < stepLabels.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {step === 0 && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep(1); }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl">Shipping details</h2>
              <Field label="Email" value={ship.email} onChange={(v) => setShip({ ...ship, email: v })} type="email" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" value={ship.firstName} onChange={(v) => setShip({ ...ship, firstName: v })} />
                <Field label="Last name" value={ship.lastName} onChange={(v) => setShip({ ...ship, lastName: v })} />
              </div>
              <Field label="Address" value={ship.address} onChange={(v) => setShip({ ...ship, address: v })} />
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="City" value={ship.city} onChange={(v) => setShip({ ...ship, city: v })} />
                <Field label="ZIP" value={ship.zip} onChange={(v) => setShip({ ...ship, zip: v })} />
                <Field label="Country" value={ship.country} onChange={(v) => setShip({ ...ship, country: v })} />
              </div>
              <div className="flex justify-end pt-2">
                <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Continue to payment
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep(2); }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl">Payment method</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { id: "card", label: "Credit card", icon: CreditCard },
                  { id: "paypal", label: "PayPal", icon: ShieldCheck },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${
                      pay.method === m.id ? "border-accent bg-accent/5" : "border-border hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      checked={pay.method === m.id}
                      onChange={() => setPay({ ...pay, method: m.id })}
                      className="sr-only"
                    />
                    <m.icon className="h-5 w-5" />
                    <span className="font-medium">{m.label}</span>
                  </label>
                ))}
              </div>

              {pay.method === "card" && (
                <div className="space-y-5 pt-2">
                  <Field label="Card number" placeholder="4242 4242 4242 4242" value={pay.card} onChange={(v) => setPay({ ...pay, card: v })} />
                  <Field label="Name on card" value={pay.name} onChange={(v) => setPay({ ...pay, name: v })} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Expiry (MM/YY)" value={pay.exp} onChange={(v) => setPay({ ...pay, exp: v })} />
                    <Field label="CVC" value={pay.cvc} onChange={(v) => setPay({ ...pay, cvc: v })} />
                  </div>
                  <p className="text-xs text-muted-foreground">This is a mock checkout. No real charge.</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button type="button" onClick={() => setStep(0)} className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Review order
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl">Review your order</h2>
              <ReviewBlock title="Shipping to" onEdit={() => setStep(0)}>
                <p>{ship.firstName} {ship.lastName}</p>
                <p>{ship.address}, {ship.city} {ship.zip}</p>
                <p>{ship.country} · {ship.email}</p>
              </ReviewBlock>
              <ReviewBlock title="Payment" onEdit={() => setStep(1)}>
                {pay.method === "card"
                  ? <p>Card ending in {pay.card.replace(/\s/g, "").slice(-4) || "••••"}</p>
                  : <p>PayPal</p>}
              </ReviewBlock>
              <div className="rounded-xl border border-border">
                <div className="border-b border-border p-4 text-sm font-semibold uppercase tracking-wide">Items</div>
                <ul className="divide-y divide-border">
                  {detailed.map((it) => (
                    <li key={it.productId} className="flex gap-4 p-4">
                      <img src={it.product.image} alt="" className="h-16 w-16 rounded-md object-cover" />
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{it.product.title}</p>
                          <p className="text-xs text-muted-foreground">Qty {it.quantity}</p>
                        </div>
                        <p className="text-sm tabular-nums">{formatPrice(it.lineTotal)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground">
                  ← Back
                </button>
                <button
                  onClick={placeOrder}
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
                >
                  Place order · {formatPrice(total)}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <PackageCheck className="h-8 w-8" />
              </div>
              <h2 className="mt-5 font-display text-3xl">Order confirmed</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you — a confirmation has been sent to your inbox.
              </p>
              <p className="mt-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm">
                Order ID: <strong className="tabular-nums">{orderId}</strong>
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-secondary">
                  Back home
                </Link>
                <button
                  onClick={() => navigate({ to: "/shop" })}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        {step < 3 && (
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
            <h3 className="font-display text-xl">Order summary</h3>
            <ul className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
              {detailed.map((it) => (
                <li key={it.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 flex-none">
                    <img src={it.product.image} alt="" className="h-full w-full rounded-md object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[11px] text-background">
                      {it.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-between text-sm">
                    <p className="line-clamp-2">{it.product.title}</p>
                    <p className="tabular-nums">{formatPrice(it.lineTotal)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-1.5 border-t border-border pt-5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <Row label="Tax" value={formatPrice(tax)} />
              <Row label="Total" value={formatPrice(total)} bold />
            </dl>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
              <Truck className="h-4 w-4" /> Estimated delivery in 3–5 business days
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent"
      />
    </label>
  );
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
        <button onClick={onEdit} className="text-xs text-accent hover:underline">Edit</button>
      </div>
      <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "border-t border-border pt-3 text-base font-semibold text-foreground" : ""}`}>
      <dt className={bold ? "" : "text-muted-foreground"}>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
