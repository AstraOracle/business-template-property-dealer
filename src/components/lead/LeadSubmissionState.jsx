export function LeadSubmissionState({
  title,
  message,
  status,
  payload,
  actionLabel,
  actionHref,
  actionVariant = "primary",
  secondaryLabel,
  onSecondaryAction,
  errorMessage = "",
}) {
  const badgeLabel = status === "success" ? "Lead saved" : "Save failed";
  const badgeClass =
    status === "success"
      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]"
      : "bg-[rgba(182,80,56,0.12)] text-[#b65038]";
  const actionClass = actionVariant === "secondary" ? "btn-secondary" : "btn-primary";

  return (
    <div className="premium-card rounded-[32px] p-6 sm:p-8">
      <div className="space-y-5">
        <span className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${badgeClass}`}>
          {badgeLabel}
        </span>

        <div>
          <h3 className="section-title text-3xl font-semibold text-[var(--color-text)]">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{message}</p>
        </div>

        <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4 text-sm text-[var(--color-text-soft)]">
          <p className="font-semibold text-[var(--color-text)]">{payload.name}</p>
          <p className="mt-2">
            {payload.inquiryType}
            {payload.locality ? ` | ${payload.locality}` : ""}
          </p>
        </div>

        {errorMessage ? (
          <div className="rounded-[22px] bg-[rgba(182,80,56,0.08)] px-4 py-3 text-sm text-[#b65038]">
            {errorMessage}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={actionHref}
            target="_blank"
            rel="noreferrer"
            className={`${actionClass} inline-flex w-full items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 sm:w-auto`}
          >
            {actionLabel}
          </a>

          {secondaryLabel && onSecondaryAction ? (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="btn-soft inline-flex w-full items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 sm:w-auto"
            >
              {secondaryLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
