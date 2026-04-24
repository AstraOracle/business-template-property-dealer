import { Link } from "react-router-dom";

const quickEntries = [
  {
    title: "Buy premium homes",
    description: "Explore end-user and investment-ready inventory with clear guidance.",
    to: "/buy",
    cta: "Explore buy options",
  },
  {
    title: "Rent with confidence",
    description: "Discover polished rentals for families, CXOs, and relocation-led tenants.",
    to: "/rent",
    cta: "View rental options",
  },
  {
    title: "Sell strategically",
    description: "Position your property with premium storytelling and sharper buyer qualification.",
    to: "/sell",
    cta: "Plan your sale",
  },
];

export function QuickEntrySection() {
  return (
    <section className="shell-container space-y-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">Quick paths</p>
        <h2 className="section-title mt-4 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
          Start from the journey that matches your intent.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {quickEntries.map((entry, index) => (
          <article
            key={entry.title}
            className="premium-card rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(20,26,41,0.10)]"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">0{index + 1}</p>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">{entry.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{entry.description}</p>
            <Link
              to={entry.to}
              className="mt-6 inline-flex items-center rounded-full bg-[var(--color-accent-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-accent-deep)] transition duration-300 hover:bg-[rgba(183,121,43,0.18)]"
            >
              {entry.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
