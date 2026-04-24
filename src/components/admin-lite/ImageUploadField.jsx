import { useState } from "react";
import { getMediaSurfaceStyle, normalizeImageUrl } from "../../utils/media";

export function ImageUploadField({
  value,
  onChange,
  label = "Image",
  helperText = "",
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const normalizedValue = normalizeImageUrl(value);

  function handleBlur() {
    onChange(normalizeImageUrl(value));
  }

  return (
    <div className="space-y-3">
      <div
        className="overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      >
        <button
          type="button"
          onClick={() => normalizedValue && setIsPreviewOpen(true)}
          className="block w-full text-left"
          disabled={!normalizedValue}
          aria-label={`Preview ${label}`}
        >
          <div className="relative h-36 w-full" style={getMediaSurfaceStyle(value)}>
            {normalizedValue ? (
              <span className="absolute bottom-3 right-3 rounded-full bg-[rgba(17,17,17,0.78)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                Click to enlarge
              </span>
            ) : null}
          </div>
        </button>
      </div>

      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
          {label} link
        </span>
        <input
          type="url"
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          onBlur={handleBlur}
          className="form-control"
          placeholder="Paste image link or Google Drive share link"
        />
      </label>

      {helperText ? (
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">{helperText}</p>
      ) : null}

      <p className="text-xs leading-6 text-[var(--color-text-soft)]">
        Accepts direct image URLs and standard Google Drive share links. Drive links are converted automatically.
      </p>

      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(10,10,10,0.82)] px-4 py-6"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[var(--color-surface)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.38)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(17,17,17,0.82)] text-lg font-semibold text-white transition duration-300 hover:bg-black"
              aria-label="Close image preview"
            >
              ×
            </button>
            <div
              className="h-[70vh] w-full rounded-[20px] bg-[var(--color-surface-muted)]"
              style={getMediaSurfaceStyle(value)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
