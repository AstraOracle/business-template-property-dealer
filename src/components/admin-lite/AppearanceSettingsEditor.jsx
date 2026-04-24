import { DEFAULT_THEME_SETTINGS, PREMIUM_THEME_PRESETS, normalizeThemeSettings } from "../../utils/theme";
import { ThemePreviewCard } from "./ThemePreviewCard";

export function AppearanceSettingsEditor({ values, onChange, onReset }) {
  const safeValues = normalizeThemeSettings(values || DEFAULT_THEME_SETTINGS);

  return (
    <div className="space-y-8">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm font-semibold text-[var(--color-text)]">Choose a premium preset</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              Pick the site style that feels right for the dealer brand. Each preset changes the full look in a safe, polished way.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {PREMIUM_THEME_PRESETS.map((preset) => {
              const isActive = safeValues.presetId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChange("presetId", preset.id)}
                  className={`rounded-[24px] border p-4 text-left transition duration-300 ${
                    isActive
                      ? "border-[var(--color-primary)] bg-[var(--color-surface-muted)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-muted)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {[
                      preset.colors.primaryColor,
                      preset.colors.secondaryColor,
                      preset.colors.backgroundColor,
                    ].map((color) => (
                      <span
                        key={`${preset.id}-${color}`}
                        className="h-4 w-4 rounded-full border border-black/5"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[var(--color-text)]">{preset.label}</p>
                  <p className="mt-2 text-xs leading-6 text-[var(--color-text-soft)]">{preset.description}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[var(--color-text)]">Button color</p>
              <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                Change the main CTA button color if the dealer wants a different brand feel. The rest of the site style stays controlled by the preset.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="color"
                value={safeValues.primaryColorOverride || "#1d2433"}
                onChange={(event) => onChange("primaryColorOverride", event.target.value)}
                className="h-12 w-14 cursor-pointer rounded-[14px] border border-[var(--color-border)] bg-white p-1"
              />
              <input
                type="text"
                value={safeValues.primaryColorOverride || ""}
                onChange={(event) => onChange("primaryColorOverride", event.target.value)}
                className="form-control"
                placeholder="Optional hex color for buttons"
              />
              <button
                type="button"
                onClick={() => onChange("primaryColorOverride", "")}
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
              >
                Use preset button color
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm font-semibold text-[var(--color-text)]">Live preview</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              Choose the site look first, then optionally change the main CTA button color. That keeps the editor simple without locking the dealer in.
            </p>
          </div>
          <ThemePreviewCard theme={safeValues} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">
          Reset restores the default site look.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[var(--color-surface-muted)]"
        >
          Reset appearance
        </button>
      </div>
    </div>
  );
}
