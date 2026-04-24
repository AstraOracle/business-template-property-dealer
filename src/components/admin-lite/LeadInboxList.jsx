import { LeadStatusBadge } from "./LeadStatusBadge";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatLeadTypeLabel(value) {
  const normalized = String(value ?? "").toLowerCase();

  if (normalized === "buy") {
    return "Buy";
  }

  if (normalized === "rent") {
    return "Rent";
  }

  if (normalized === "sell") {
    return "Sell";
  }

  return "General";
}

export function LeadInboxList({
  leads,
  isUpdating,
  onMarkContacted,
  getOpenWhatsAppLink,
  getSendOptionsLink,
  getScheduleVisitLink,
}) {
  if (leads.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-5 py-6 text-sm text-[var(--color-text-soft)]">
        No leads match the current filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <article key={lead.id} className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text)]">{lead.name}</h3>
                <LeadStatusBadge status={lead.status} />
              </div>
              <div className="grid gap-3 text-sm leading-7 text-[var(--color-text-soft)] sm:grid-cols-2 xl:grid-cols-4">
                <p className="break-all"><span className="font-semibold text-[var(--color-text)]">Phone:</span> {lead.phone || "Not provided"}</p>
                <p><span className="font-semibold text-[var(--color-text)]">Lead type:</span> {formatLeadTypeLabel(lead.leadType)}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Locality:</span> {lead.locality || "Not provided"}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Budget:</span> {lead.budget || "Not provided"}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Source:</span> {lead.sourcePage}</p>
                <p><span className="font-semibold text-[var(--color-text)]">Timestamp:</span> {formatTimestamp(lead.timestamp)}</p>
              </div>
            </div>
          </div>

          {lead.notes ? (
            <p className="mt-4 break-words rounded-[20px] bg-[var(--color-surface-muted)] px-4 py-3 text-sm leading-7 text-[var(--color-text-soft)]">
              {lead.notes}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <a
              href={getOpenWhatsAppLink(lead)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)]"
            >
              Open WhatsApp
            </a>
            <a
              href={getSendOptionsLink(lead)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
            >
              Send Options
            </a>
            <a
              href={getScheduleVisitLink(lead)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
            >
              Schedule Visit
            </a>
            <button
              type="button"
              onClick={() => onMarkContacted(lead)}
              disabled={isUpdating === lead.id || lead.status === "contacted"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent-soft)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-deep)] transition duration-300 hover:bg-[rgba(183,121,43,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating === lead.id ? "Updating..." : lead.status === "contacted" ? "Contacted" : "Mark as Contacted"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
