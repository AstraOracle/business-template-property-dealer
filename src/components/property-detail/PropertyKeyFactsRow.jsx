import { formatBedBathLabel, formatPropertyArea, toTitleCase } from "../../utils/formatters";

export function PropertyKeyFactsRow({ property }) {
  const items = [
    { label: "Purpose", value: toTitleCase(property.purpose) },
    { label: "Type", value: property.propertyType },
    { label: "Configuration", value: formatBedBathLabel(property) },
    { label: "Area", value: formatPropertyArea(property) },
  ];

  return (
    <section className="site-section grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="premium-card rounded-[24px] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">{item.label}</p>
          <p className="mt-3 text-base font-semibold text-[var(--color-text)]">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
