const trustBadges = [
  "Premium micro-market guidance",
  "Verified listing-first presentation",
  "Private site visit coordination",
  "Seller-focused pricing support",
];

export function TrustBadgesStrip() {
  return (
    <section className="shell-container">
      <div className="grid gap-3 rounded-[28px] border border-[var(--color-border)] bg-[rgba(255,253,249,0.84)] p-4 sm:grid-cols-2 xl:grid-cols-4">
        {trustBadges.map((badge) => (
          <div
            key={badge}
            className="rounded-[22px] bg-white/80 px-4 py-4 text-center text-sm font-medium text-[var(--color-text)] shadow-[0_12px_24px_rgba(20,26,41,0.04)]"
          >
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
