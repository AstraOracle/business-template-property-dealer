export function AdminSidebar({ sections, activeSection, onSelectSection, onLogout }) {
  return (
    <aside className="premium-card rounded-[32px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">Content editor</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">Update key business content in one place</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
        >
          Lock
        </button>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:block lg:space-y-3 lg:overflow-visible">
        {sections.map((section) => {
          const isActive = section.id === activeSection;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelectSection(section.id)}
              className={`min-w-max rounded-full px-4 py-3.5 text-sm font-semibold transition duration-300 lg:flex lg:w-full lg:items-center lg:justify-between lg:rounded-[22px] ${
                isActive
                  ? "bg-[var(--color-primary)] text-[var(--color-button-text)]"
                  : "bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:bg-[rgba(183,121,43,0.12)]"
              }`}
            >
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
