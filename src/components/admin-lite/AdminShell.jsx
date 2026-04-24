export function AdminShell({ sidebar, children }) {
  return (
    <section className="shell-container py-14 sm:py-20">
      <div className="space-y-12">
        <div className="rounded-[36px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(242,235,225,0.92))] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">Hidden admin surface</p>
          <h1 className="section-title mt-4 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
            Simple business control for listings, enquiries, and brand updates.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
            Use this private area to update the most important parts of the website quickly, without turning it into a heavy dashboard.
          </p>
        </div>

        <div className="grid gap-12 pb-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">{sidebar}</div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
