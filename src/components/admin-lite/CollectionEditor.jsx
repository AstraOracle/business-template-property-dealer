import { useEffect, useRef, useState } from "react";
import { ImageUploadField } from "./ImageUploadField";

function renderField({ field, item, onChange }) {
  const value = item[field.key];

  if (field.type === "textarea") {
    return (
      <textarea
        value={value ?? ""}
        rows={4}
        onChange={(event) => onChange(field.key, event.target.value)}
        className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value ?? field.options?.[0]?.value ?? ""}
        onChange={(event) => onChange(field.key, event.target.value)}
        className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
      >
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="inline-flex items-center gap-3 rounded-[18px] bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--color-text)]">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.key, event.target.checked)}
          className="h-4 w-4 accent-[var(--color-accent-deep)]"
        />
        <span>{field.checkboxLabel || field.label}</span>
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <ImageUploadField
        value={value ?? ""}
        onChange={(nextValue) => onChange(field.key, nextValue)}
        entityType={field.entityType}
        entityId={item.id}
        fieldKey={field.key}
        label={field.label}
        helperText={field.helperText}
      />
    );
  }

  if (field.type === "image-list") {
    const imageValues = Array.isArray(value) ? value : [];

    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: field.maxItems || 3 }).map((_, index) => (
          <div key={`${item.id}-${field.key}-${index}`} className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              {field.itemLabel || "Gallery image"} {index + 1}
            </span>
            <ImageUploadField
              value={imageValues[index] || ""}
              onChange={(nextValue) => {
                const nextImages = [...imageValues];

                if (nextValue) {
                  nextImages[index] = nextValue;
                } else {
                  nextImages[index] = "";
                }

                onChange(
                  field.key,
                  nextImages.map((image) => String(image || "").trim()).filter(Boolean),
                );
              }}
              entityType={field.entityType}
              entityId={item.id}
              fieldKey={`${field.key}-${index + 1}`}
              helperText={index === 0 ? field.helperText : ""}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <input
      type={field.type || "text"}
      value={value ?? ""}
      onChange={(event) => onChange(field.key, field.type === "number" ? Number(event.target.value) : event.target.value)}
      className="w-full rounded-[18px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition duration-300 focus:border-[var(--color-accent-deep)]"
    />
  );
}

export function CollectionEditor({
  items,
  fields,
  addLabel,
  emptyLabel,
  getItemTitle,
  getItemSubtitle,
  onAdd,
  onDelete,
  onChangeItem,
  onSave,
  isSaving,
  saveLabel = "Save changes",
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const previousItemKeysRef = useRef([]);

  useEffect(() => {
    setExpandedItems((current) => {
      const nextState = {};
      const currentItemKeys = items.map((item, index) => item.id || `${getItemTitle(item, index)}-${index}`);
      const previousItemKeys = previousItemKeysRef.current;
      const newItemKeys = currentItemKeys.filter((itemKey) => !previousItemKeys.includes(itemKey));

      items.forEach((item, index) => {
        const itemKey = currentItemKeys[index];
        nextState[itemKey] = newItemKeys.includes(itemKey) ? true : (current[itemKey] ?? index === 0);
      });

      previousItemKeysRef.current = currentItemKeys;
      return nextState;
    });
  }, [getItemTitle, items]);

  const scopedFields = fields.map((field) => ({
    ...field,
  }));

  function toggleItem(itemKey) {
    setExpandedItems((current) => ({
      ...current,
      [itemKey]: !current[itemKey],
    }));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">
          {items.length} item{items.length === 1 ? "" : "s"} in this section.
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)]"
        >
          {addLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-5 py-6 text-sm text-[var(--color-text-soft)]">
          {emptyLabel}
        </div>
      ) : null}

      <div className="space-y-5">
        {items.map((item, index) => {
          const itemKey = item.id || `${getItemTitle(item, index)}-${index}`;
          const isExpanded = Boolean(expandedItems[itemKey]);

          return (
            <article key={itemKey} className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <button
                  type="button"
                  onClick={() => toggleItem(itemKey)}
                  className="flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-[var(--color-text)]">{getItemTitle(item, index)}</h3>
                      <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-soft)]">
                        {isExpanded ? "Open" : "Closed"}
                      </span>
                    </div>
                    {getItemSubtitle ? (
                      <p className="text-sm leading-7 text-[var(--color-text-soft)]">{getItemSubtitle(item, index)}</p>
                    ) : null}
                  </div>
                  <span className="mt-1 shrink-0 rounded-full bg-[var(--color-surface-muted)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text)]">
                    {isExpanded ? "Collapse" : "Expand"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(142,58,34,0.18)] px-4 py-2 text-sm font-semibold text-[#8e3a22] transition duration-300 hover:bg-[rgba(142,58,34,0.08)]"
                >
                  Delete
                </button>
              </div>

              {isExpanded ? (
                <div className="mt-5 border-t border-[var(--color-border)] pt-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    {scopedFields.map((field) => (
                      <div
                        key={`${item.id}-${field.key}`}
                        className={`block space-y-2 ${field.layout === "full" || field.type === "textarea" || field.type === "image" || field.type === "image-list" ? "md:col-span-2" : ""}`}
                      >
                        {field.type !== "checkbox" ? (
                          <span className="text-sm font-semibold text-[var(--color-text)]">{field.label}</span>
                        ) : null}
                        {renderField({
                          field,
                          item,
                          onChange: (key, value) => onChangeItem(index, key, value),
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-5">
                    <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                      Save from here once this item looks right.
                    </p>
                    {onSave ? (
                      <button
                        type="button"
                        onClick={onSave}
                        disabled={isSaving}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? "Saving..." : saveLabel}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
