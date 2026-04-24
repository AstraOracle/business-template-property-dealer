export function EditorSection({
  eyebrow,
  title,
  description,
  statusMessage,
  errorMessage,
  children,
  actions,
}) {
  return (
    <section className="premium-card rounded-[32px] p-6 sm:p-8">
      <div className="-mx-2 rounded-[28px] bg-[var(--color-surface)]/92 px-2 pb-6 backdrop-blur-sm sm:-mx-3 sm:px-3">
        <div className="sticky top-4 z-10 rounded-[28px] border-b border-[var(--color-border)] bg-[var(--color-surface)]/96 pb-6 pt-1 backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">{eyebrow}</p>
              <h2 className="section-title text-3xl font-semibold text-[var(--color-text)]">{title}</h2>
              <p className="max-w-3xl text-sm leading-8 text-[var(--color-text-soft)]">{description}</p>
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </div>

      {statusMessage ? (
        <p className="mt-5 rounded-[20px] bg-[rgba(183,121,43,0.08)] px-4 py-3 text-sm text-[var(--color-accent-deep)]">
          {statusMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-5 rounded-[20px] bg-[rgba(142,58,34,0.08)] px-4 py-3 text-sm text-[#8e3a22]">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 space-y-6">{children}</div>

      {actions ? (
        <div className="mt-8 border-t border-[var(--color-border)] pt-5">
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
      ) : null}
    </section>
  );
}
