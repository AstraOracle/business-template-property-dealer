export function PropertyFilterBar({
  filters,
  onFilterChange,
  onReset,
  purposeOptions,
  localityOptions,
  budgetOptions,
}) {
  const selectClassName = "form-select";

  return (
    <div className="premium-card rounded-[30px] p-5 sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Purpose
            </span>
            <select
              className={selectClassName}
              value={filters.purpose}
              onChange={(event) => onFilterChange("purpose", event.target.value)}
            >
              {purposeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Locality
            </span>
            <select
              className={selectClassName}
              value={filters.locality}
              onChange={(event) => onFilterChange("locality", event.target.value)}
            >
              {localityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Budget range
            </span>
            <select
              className={selectClassName}
              value={filters.budgetRange}
              onChange={(event) => onFilterChange("budgetRange", event.target.value)}
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
