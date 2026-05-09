export function LeadInboxFilters({
  leadType,
  locality,
  sortBy,
  hotOnly,
  uncontactedOnly,
  leadTypeOptions,
  localityOptions,
  onChange,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChange("hotOnly", !hotOnly)}
          className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition duration-300 ${
            hotOnly
              ? "bg-[rgba(185,28,28,0.12)] text-[#b91c1c]"
              : "bg-[var(--color-surface-muted)] text-[var(--color-text-soft)]"
          }`}
        >
          HOT only
        </button>
        <button
          type="button"
          onClick={() => onChange("uncontactedOnly", !uncontactedOnly)}
          className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition duration-300 ${
            uncontactedOnly
              ? "bg-[rgba(180,83,9,0.12)] text-[#b45309]"
              : "bg-[var(--color-surface-muted)] text-[var(--color-text-soft)]"
          }`}
        >
          Uncontacted only
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">Filter by intent</span>
          <select
            value={leadType}
            onChange={(event) => onChange("leadType", event.target.value)}
            className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
          >
            {leadTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All intents" : option}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">Filter by locality</span>
          <select
            value={locality}
            onChange={(event) => onChange("locality", event.target.value)}
            className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
          >
            {localityOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All localities" : option}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">Sort leads</span>
          <select
            value={sortBy}
            onChange={(event) => onChange("sortBy", event.target.value)}
            className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
          >
            <option value="priority">HOT first</option>
            <option value="latest">Newest first</option>
            <option value="uncontacted">Uncontacted first</option>
          </select>
        </label>
      </div>
    </div>
  );
}
