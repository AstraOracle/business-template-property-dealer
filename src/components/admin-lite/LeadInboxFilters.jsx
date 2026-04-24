export function LeadInboxFilters({
  leadType,
  locality,
  leadTypeOptions,
  localityOptions,
  onChange,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-[var(--color-text)]">Filter by lead type</span>
        <select
          value={leadType}
          onChange={(event) => onChange("leadType", event.target.value)}
          className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
        >
          {leadTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All lead types" : option}
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
    </div>
  );
}
