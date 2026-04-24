import { DEFAULT_THEME_SETTINGS, getThemePreset, normalizeThemeSettings, resolveThemePalette } from "../../utils/theme";

export function ThemePreviewCard({ theme }) {
  const safeTheme = normalizeThemeSettings(theme || DEFAULT_THEME_SETTINGS);
  const preset = getThemePreset(safeTheme.presetId);
  const palette = resolveThemePalette(safeTheme);

  return (
    <div
      className="rounded-[28px] border p-5 shadow-[0_18px_38px_rgba(20,26,41,0.06)]"
      style={{
        backgroundColor: palette.cardBackgroundColor,
        borderColor: `${palette.textColor}14`,
        color: palette.textColor,
      }}
    >
      <div className="space-y-4">
        <span
          className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{
            backgroundColor: `${palette.secondaryColor}1f`,
            color: palette.secondaryColor,
          }}
        >
          {preset.label}
        </span>

        <div className="space-y-3">
          <h3 className="section-title text-2xl font-semibold">Premium property interface</h3>
          <p className="text-sm leading-7" style={{ color: `${palette.textColor}bb` }}>
            This preview shows how the preset will feel on the public site. The goal is a sharp, trustworthy interface with one dominant CTA color.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full px-5 py-3 text-sm font-semibold"
            style={{
              backgroundColor: palette.primaryColor,
              color: palette.buttonTextColor,
            }}
          >
            Primary CTA
          </button>
          <button
            type="button"
            className="rounded-full px-5 py-3 text-sm font-semibold"
            style={{
              backgroundColor: `${palette.secondaryColor}1f`,
              color: palette.secondaryColor,
            }}
          >
            Accent detail
          </button>
        </div>

        <div className="rounded-[22px] p-4" style={{ backgroundColor: palette.mutedBackgroundColor }}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: palette.secondaryColor }}>
            Card surface
          </p>
          <p className="mt-2 text-sm leading-7" style={{ color: `${palette.textColor}bb` }}>
            Supporting surfaces, chips, and secondary panels stay aligned to the preset so the interface remains clean and readable.
          </p>
        </div>
      </div>
    </div>
  );
}
