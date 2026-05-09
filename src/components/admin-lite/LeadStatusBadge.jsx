const statusStyles = {
  new: "bg-[rgba(183,121,43,0.12)] text-[var(--color-accent-deep)]",
  contacted: "bg-[rgba(37,99,235,0.12)] text-[#1d4ed8]",
  closed: "bg-[rgba(22,101,52,0.12)] text-[#166534]",
};

function formatStatusLabel(status) {
  return String(status ?? "new")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function LeadStatusBadge({ status }) {
  const normalizedStatus = String(status ?? "new").trim().toLowerCase().replace(/\s+/g, "_");
  const resolvedStatus = statusStyles[normalizedStatus] ? normalizedStatus : "new";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${statusStyles[resolvedStatus]}`}>
      {formatStatusLabel(status)}
    </span>
  );
}
