const advantages = [
  {
    title: "High-trust property selection",
    description: "Focused shortlists built around budget, livability, and long-term value rather than noise.",
  },
  {
    title: "Micro-market understanding",
    description: "Locality-led guidance that helps buyers and investors compare premium neighbourhoods properly.",
  },
  {
    title: "Concierge-style assistance",
    description: "Site visits, screening, and negotiations handled with a polished white-glove approach.",
  },
  {
    title: "Seller positioning support",
    description: "Sharper presentation and buyer qualification for owners seeking a premium sale process.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="shell-container site-section">
      <div className="rounded-[40px] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(242,235,225,0.88))] p-7 sm:p-10 md:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">Why choose us</p>
            <h2 className="section-title text-[2rem] font-semibold leading-[1.04] text-[var(--color-text)] sm:text-[2.5rem]">
              A calmer advisory experience with stronger decision support at every step.
            </h2>
            <p className="text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
              The goal is not to overwhelm visitors. It is to help serious buyers, tenants, and owners understand why this service feels more qualified, more local, and more dependable than typical brokerage experiences.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <article key={advantage.title} className="premium-card rounded-[28px] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">{advantage.title}</h3>
                <p className="mt-3 text-sm leading-8 text-[var(--color-text-soft)]">{advantage.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
