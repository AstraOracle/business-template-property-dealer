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

function getMinutesSince(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
}

function formatRelativeLeadAge(timestamp) {
  const minutes = getMinutesSince(timestamp);

  if (minutes === null) {
    return "Unknown time";
  }

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
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

function formatTimelineLabel(lead) {
  return lead.timeline || "Not provided";
}

function formatStatusActionLabel(status) {
  const normalized = String(status ?? "").trim().toLowerCase();
  return normalized;
}

function getLeadUrgency(lead) {
  const normalizedStatus = formatStatusActionLabel(lead.status);
  const leadAgeMinutes = getMinutesSince(lead.createdAt || lead.timestamp);

  if (normalizedStatus !== "new" || leadAgeMinutes === null) {
    return null;
  }

  if (leadAgeMinutes >= 120) {
    return {
      tone: "high",
      title: `New lead (${formatRelativeLeadAge(lead.createdAt || lead.timestamp)})`,
      subtitle: "Not contacted yet",
      cardClass: "border-[rgba(185,28,28,0.28)] bg-[rgba(185,28,28,0.03)]",
      badgeClass: "bg-[rgba(185,28,28,0.12)] text-[#b91c1c]",
    };
  }

  if (leadAgeMinutes >= 30) {
    return {
      tone: "medium",
      title: `New lead (${formatRelativeLeadAge(lead.createdAt || lead.timestamp)})`,
      subtitle: "Not contacted yet",
      cardClass: "border-[rgba(180,83,9,0.28)] bg-[rgba(180,83,9,0.03)]",
      badgeClass: "bg-[rgba(180,83,9,0.12)] text-[#b45309]",
    };
  }

  return {
    tone: "fresh",
    title: `New lead (${formatRelativeLeadAge(lead.createdAt || lead.timestamp)})`,
    subtitle: "Not contacted yet",
    cardClass: "",
    badgeClass: "bg-[rgba(37,99,235,0.12)] text-[#1d4ed8]",
  };
}

function LeadScoreBadge({ score }) {
  const normalizedScore = String(score ?? "WARM").toUpperCase();
  const scoreStyles = {
    HOT: "bg-[rgba(185,28,28,0.12)] text-[#b91c1c]",
    WARM: "bg-[rgba(180,83,9,0.12)] text-[#b45309]",
    COLD: "bg-[rgba(55,65,81,0.12)] text-[#374151]",
  };
  const resolvedScore = scoreStyles[normalizedScore] ? normalizedScore : "WARM";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${scoreStyles[resolvedScore]}`}>
      {resolvedScore}
    </span>
  );
}

export function LeadInboxList({
  leads,
  isUpdating,
  onUpdateStatus,
  getDealerAlertLink,
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
      {leads.map((lead) => {
        const urgency = getLeadUrgency(lead);

        return (
        <article
          key={lead.id}
          className={`rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 ${urgency?.cardClass || ""}`}
        >
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text)]">{lead.name}</h3>
                <LeadStatusBadge status={lead.status} />
                <LeadScoreBadge score={lead.score} />
                {urgency ? (
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${urgency.badgeClass}`}>
                    {urgency.tone === "high" ? "Urgent" : urgency.tone === "medium" ? "Pending" : "Fresh"}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm leading-7">
                <p className="font-semibold text-[var(--color-text)]">
                  {urgency ? urgency.title : `Lead updated (${formatRelativeLeadAge(lead.lastUpdatedAt || lead.createdAt || lead.timestamp)})`}
                </p>
                <p className="text-[var(--color-text-soft)]">
                  {urgency ? urgency.subtitle : `Last touched ${formatRelativeLeadAge(lead.lastUpdatedAt || lead.createdAt || lead.timestamp)}`}
                </p>
              </div>
              <div className="grid gap-3 text-sm leading-7 text-[var(--color-text-soft)] sm:grid-cols-2 xl:grid-cols-4">
                <p className="break-all"><span className="font-semibold text-[var(--color-text)]">Phone:</span> {lead.phone || "Not provided"}</p>
                <p><span className="font-semibold text-[var(--color-text)]">Intent:</span> {formatLeadTypeLabel(lead.intent || lead.leadType)}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Property type:</span> {lead.propertyType || "Not provided"}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Locality:</span> {lead.locality || "Not provided"}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Budget:</span> {lead.budget || "Not provided"}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Timeline:</span> {formatTimelineLabel(lead)}</p>
                <p className="break-words"><span className="font-semibold text-[var(--color-text)]">Source:</span> {lead.sourcePage}</p>
                <p><span className="font-semibold text-[var(--color-text)]">Created:</span> {formatTimestamp(lead.createdAt || lead.timestamp)}</p>
                <p><span className="font-semibold text-[var(--color-text)]">Updated:</span> {formatTimestamp(lead.lastUpdatedAt || lead.createdAt || lead.timestamp)}</p>
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
              href={getDealerAlertLink(lead)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)]"
            >
              Dealer Alert
            </a>
            <a
              href={getOpenWhatsAppLink(lead)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
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
              onClick={() => onUpdateStatus(lead, "Contacted")}
              disabled={isUpdating === lead.id || formatStatusActionLabel(lead.status) === "contacted"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent-soft)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-deep)] transition duration-300 hover:bg-[rgba(183,121,43,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating === lead.id ? "Updating..." : formatStatusActionLabel(lead.status) === "contacted" ? "Contacted" : "Mark Contacted"}
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(lead, "Closed")}
              disabled={isUpdating === lead.id || formatStatusActionLabel(lead.status) === "closed"}
              className="inline-flex items-center justify-center rounded-full bg-[rgba(22,101,52,0.12)] px-5 py-3 text-sm font-semibold text-[#166534] transition duration-300 hover:bg-[rgba(22,101,52,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating === lead.id ? "Updating..." : formatStatusActionLabel(lead.status) === "closed" ? "Closed" : "Mark Closed"}
            </button>
          </div>
        </article>
      )})}
    </div>
  );
}
