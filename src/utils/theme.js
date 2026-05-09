import { useEffect } from "react";

export const SITE_SETTINGS_STORAGE_KEY = "dealer-site-settings";

export const PREMIUM_THEME_PRESETS = [
  {
    id: "modern-blue",
    label: "Modern Blue",
    description: "Clean corporate clarity with cool blue accents and crisp elevated cards.",
    colors: {
      primaryColor: "#1f4fa3",
      primaryHoverColor: "#153b7c",
      secondaryColor: "#4f7fd1",
      backgroundColor: "#eff4fb",
      textColor: "#18263b",
      textSoftColor: "#5a6a80",
      mutedBackgroundColor: "#dde7f5",
      cardBackgroundColor: "#ffffff",
      buttonTextColor: "#ffffff",
    },
    ui: {
      bodyGradientStart: "#f7fbff",
      bodyGradientEnd: "#e9f1fb",
      radialAccent: "79 127 209",
      cardShadow: "0 18px 48px rgba(24, 38, 59, 0.08)",
      cardHoverShadow: "0 26px 64px rgba(24, 38, 59, 0.12)",
      cardBorderOpacity: "0.08",
      cardRadius: "28px",
      panelGradientStart: "#ffffff",
      panelGradientEnd: "#edf3fb",
      glassBackground: "rgba(255, 255, 255, 0.78)",
      sectionContrastBackground: "#f3f7fd",
      buttonRadius: "999px",
      primaryButtonMode: "filled",
      secondaryButtonMode: "outline",
      chipRadius: "999px",
    },
  },
  {
    id: "luxury-dark",
    label: "Luxury Dark",
    description: "High-end dark surfaces, soft gold accents, and richer contrast.",
    colors: {
      primaryColor: "#d3ab62",
      primaryHoverColor: "#b99049",
      secondaryColor: "#8b6a35",
      backgroundColor: "#0d1118",
      textColor: "#eef2f8",
      textSoftColor: "#a7b2c0",
      mutedBackgroundColor: "#171d28",
      cardBackgroundColor: "#121926",
      buttonTextColor: "#0f131c",
    },
    ui: {
      bodyGradientStart: "#151b27",
      bodyGradientEnd: "#090d14",
      radialAccent: "211 171 98",
      cardShadow: "0 20px 56px rgba(3, 7, 18, 0.45)",
      cardHoverShadow: "0 30px 76px rgba(3, 7, 18, 0.58)",
      cardBorderOpacity: "0.14",
      cardRadius: "26px",
      panelGradientStart: "#161d2a",
      panelGradientEnd: "#0d121b",
      glassBackground: "rgba(18, 25, 38, 0.82)",
      sectionContrastBackground: "#101723",
      buttonRadius: "18px",
      primaryButtonMode: "filled",
      secondaryButtonMode: "soft",
      chipRadius: "16px",
    },
  },
  {
    id: "fresh-green",
    label: "Fresh Green",
    description: "Approachable calm with botanical greens and softer friendly surfaces.",
    colors: {
      primaryColor: "#2c6b55",
      primaryHoverColor: "#214f40",
      secondaryColor: "#6b9d78",
      backgroundColor: "#f1f6f0",
      textColor: "#203129",
      textSoftColor: "#607267",
      mutedBackgroundColor: "#dfeadf",
      cardBackgroundColor: "#fbfdf9",
      buttonTextColor: "#ffffff",
    },
    ui: {
      bodyGradientStart: "#f7fbf6",
      bodyGradientEnd: "#edf5ea",
      radialAccent: "107 157 120",
      cardShadow: "0 16px 42px rgba(32, 49, 41, 0.07)",
      cardHoverShadow: "0 24px 54px rgba(32, 49, 41, 0.11)",
      cardBorderOpacity: "0.08",
      cardRadius: "30px",
      panelGradientStart: "#fcfefb",
      panelGradientEnd: "#edf5ea",
      glassBackground: "rgba(251, 253, 249, 0.8)",
      sectionContrastBackground: "#e8f0e5",
      buttonRadius: "999px",
      primaryButtonMode: "filled",
      secondaryButtonMode: "soft",
      chipRadius: "999px",
    },
  },
  {
    id: "bold-orange",
    label: "Bold Orange",
    description: "High-conversion energy with warmer accents and sharper action styling.",
    colors: {
      primaryColor: "#d65b1f",
      primaryHoverColor: "#b84a12",
      secondaryColor: "#f29b4b",
      backgroundColor: "#fbf3ec",
      textColor: "#2e1f17",
      textSoftColor: "#785e4d",
      mutedBackgroundColor: "#f4dfcf",
      cardBackgroundColor: "#fffaf6",
      buttonTextColor: "#ffffff",
    },
    ui: {
      bodyGradientStart: "#fff8f1",
      bodyGradientEnd: "#f8ecdf",
      radialAccent: "242 155 75",
      cardShadow: "0 18px 46px rgba(46, 31, 23, 0.08)",
      cardHoverShadow: "0 26px 62px rgba(46, 31, 23, 0.14)",
      cardBorderOpacity: "0.08",
      cardRadius: "24px",
      panelGradientStart: "#fffdfb",
      panelGradientEnd: "#f8ecdf",
      glassBackground: "rgba(255, 250, 246, 0.82)",
      sectionContrastBackground: "#f8e8db",
      buttonRadius: "14px",
      primaryButtonMode: "filled",
      secondaryButtonMode: "outline",
      chipRadius: "14px",
    },
  },
  {
    id: "minimal-black-white",
    label: "Minimal Black/White",
    description: "Ultra-clean monochrome with flatter cards and restrained premium sharpness.",
    colors: {
      primaryColor: "#111111",
      primaryHoverColor: "#000000",
      secondaryColor: "#5f5f5f",
      backgroundColor: "#f7f7f7",
      textColor: "#121212",
      textSoftColor: "#666666",
      mutedBackgroundColor: "#ededed",
      cardBackgroundColor: "#ffffff",
      buttonTextColor: "#ffffff",
    },
    ui: {
      bodyGradientStart: "#fcfcfc",
      bodyGradientEnd: "#f2f2f2",
      radialAccent: "95 95 95",
      cardShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
      cardHoverShadow: "0 10px 24px rgba(0, 0, 0, 0.08)",
      cardBorderOpacity: "0.12",
      cardRadius: "18px",
      panelGradientStart: "#ffffff",
      panelGradientEnd: "#f5f5f5",
      glassBackground: "rgba(255, 255, 255, 0.82)",
      sectionContrastBackground: "#efefef",
      buttonRadius: "8px",
      primaryButtonMode: "filled",
      secondaryButtonMode: "outline",
      chipRadius: "10px",
    },
  },
];

export const DEFAULT_THEME_SETTINGS = {
  presetId: "modern-blue",
  primaryColorOverride: "",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function isValidHexColor(value) {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(String(value || "").trim());
}

function expandHex(value) {
  const color = String(value || "").trim();

  if (!color) {
    return "";
  }

  if (!isValidHexColor(color)) {
    return "";
  }

  if (color.length === 7) {
    return color.toLowerCase();
  }

  const [r, g, b] = color.slice(1).split("");
  return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
}

function hexToRgb(color) {
  const normalized = expandHex(color);

  if (!normalized) {
    return null;
  }

  const value = normalized.slice(1);

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToString(rgb) {
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

function channelToLinear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function getLuminance(color) {
  const rgb = hexToRgb(color);

  if (!rgb) {
    return 0;
  }

  const red = channelToLinear(rgb.r);
  const green = channelToLinear(rgb.g);
  const blue = channelToLinear(rgb.b);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function getContrastRatio(colorA, colorB) {
  const luminanceA = getLuminance(colorA);
  const luminanceB = getLuminance(colorB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);

  return (lighter + 0.05) / (darker + 0.05);
}

function pickReadableButtonText(backgroundColor) {
  const whiteContrast = getContrastRatio(backgroundColor, "#ffffff");
  const blackContrast = getContrastRatio(backgroundColor, "#111111");

  return whiteContrast >= blackContrast ? "#ffffff" : "#111111";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function darkenColor(color, factor = 0.16) {
  const rgb = hexToRgb(color);

  if (!rgb) {
    return color;
  }

  const next = {
    r: Math.round(rgb.r * (1 - factor)),
    g: Math.round(rgb.g * (1 - factor)),
    b: Math.round(rgb.b * (1 - factor)),
  };

  return `#${[next.r, next.g, next.b]
    .map((channel) => clamp(channel, 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function parseStoredSiteSettings() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(SITE_SETTINGS_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

export function getThemePreset(presetId) {
  return PREMIUM_THEME_PRESETS.find((preset) => preset.id === presetId) || PREMIUM_THEME_PRESETS[0];
}

export function normalizeThemeSettings(theme = {}) {
  if (theme.primaryColor || theme.primaryHoverColor || theme.secondaryColor || theme.backgroundColor) {
    return {
      presetId: DEFAULT_THEME_SETTINGS.presetId,
      primaryColorOverride: expandHex(theme.primaryColor) || "",
    };
  }

  return {
    presetId: getThemePreset(theme.presetId || DEFAULT_THEME_SETTINGS.presetId).id,
    primaryColorOverride: expandHex(theme.primaryColorOverride) || "",
  };
}

export function resolveThemeConfig(themeSettings = DEFAULT_THEME_SETTINGS) {
  const normalizedTheme = normalizeThemeSettings(themeSettings);
  const preset = getThemePreset(normalizedTheme.presetId);
  const colors = {
    ...preset.colors,
  };

  if (normalizedTheme.primaryColorOverride) {
    colors.primaryColor = normalizedTheme.primaryColorOverride;
    colors.primaryHoverColor = darkenColor(normalizedTheme.primaryColorOverride, 0.18);
    colors.buttonTextColor = pickReadableButtonText(normalizedTheme.primaryColorOverride);
  }

  return {
    preset,
    normalizedTheme,
    colors,
    ui: preset.ui,
  };
}

export function resolveThemePalette(themeSettings = DEFAULT_THEME_SETTINGS) {
  return resolveThemeConfig(themeSettings).colors;
}

export function validateThemeSettings(theme = {}) {
  const resolvedTheme = resolveThemeConfig(theme);

  if (getContrastRatio(resolvedTheme.colors.backgroundColor, resolvedTheme.colors.textColor) < 4.5) {
    return {
      ok: false,
      error: "This theme preset does not have enough background and text contrast.",
    };
  }

  if (getContrastRatio(resolvedTheme.colors.cardBackgroundColor, resolvedTheme.colors.textColor) < 4.5) {
    return {
      ok: false,
      error: "This theme preset does not have enough card and text contrast.",
    };
  }

  return {
    ok: true,
    normalizedTheme: resolvedTheme.normalizedTheme,
    resolvedPalette: resolvedTheme.colors,
  };
}

export function applyThemeVariables(theme = DEFAULT_THEME_SETTINGS) {
  if (!isBrowser()) {
    return;
  }

  const root = document.documentElement;
  const { preset, colors, ui } = resolveThemeConfig(theme);
  const textRgb = hexToRgb(colors.textColor);
  const secondaryRgb = hexToRgb(colors.secondaryColor);

  root.dataset.themePreset = preset.id;
  root.style.setProperty("--color-primary", colors.primaryColor);
  root.style.setProperty("--color-primary-hover", colors.primaryHoverColor);
  root.style.setProperty("--color-secondary-accent", colors.secondaryColor);
  root.style.setProperty("--color-background", colors.backgroundColor);
  root.style.setProperty("--color-text", colors.textColor);
  root.style.setProperty("--color-text-soft", colors.textSoftColor);
  root.style.setProperty("--color-surface-muted", colors.mutedBackgroundColor);
  root.style.setProperty("--color-surface", colors.cardBackgroundColor);
  root.style.setProperty("--color-button-text", colors.buttonTextColor);
  root.style.setProperty("--color-accent", colors.secondaryColor);
  root.style.setProperty("--color-accent-deep", colors.secondaryColor);
  root.style.setProperty("--color-accent-soft", `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.12)`);
  root.style.setProperty("--color-border", `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, ${ui.cardBorderOpacity})`);
  root.style.setProperty("--color-border-strong", `rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, ${Math.min(Number(ui.cardBorderOpacity) + 0.08, 0.24)})`);
  root.style.setProperty("--color-text-rgb", rgbToString(textRgb));
  root.style.setProperty("--color-secondary-rgb", ui.radialAccent);

  root.style.setProperty("--theme-body-gradient-start", ui.bodyGradientStart);
  root.style.setProperty("--theme-body-gradient-end", ui.bodyGradientEnd);
  root.style.setProperty("--theme-card-shadow", ui.cardShadow);
  root.style.setProperty("--theme-card-hover-shadow", ui.cardHoverShadow);
  root.style.setProperty("--theme-card-radius", ui.cardRadius);
  root.style.setProperty("--theme-panel-gradient-start", ui.panelGradientStart);
  root.style.setProperty("--theme-panel-gradient-end", ui.panelGradientEnd);
  root.style.setProperty("--theme-glass-bg", ui.glassBackground);
  root.style.setProperty("--theme-section-contrast", ui.sectionContrastBackground);
  root.style.setProperty("--theme-button-radius", ui.buttonRadius);
  root.style.setProperty("--theme-button-primary-mode", ui.primaryButtonMode);
  root.style.setProperty("--theme-button-secondary-mode", ui.secondaryButtonMode);
  root.style.setProperty("--theme-chip-radius", ui.chipRadius);
}

export function persistSiteSettings(settings) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(SITE_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage failures and keep runtime behavior safe.
  }
}

export function getStoredSiteSettings() {
  return parseStoredSiteSettings();
}

async function fetchRemoteSiteSettings() {
  const publicAppsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || import.meta.env.VITE_ADMIN_APPS_SCRIPT_URL;

  if (!publicAppsScriptUrl) {
    return {
      ok: false,
      skipped: true,
      data: null,
    };
  }

  try {
    const url = new URL(publicAppsScriptUrl);
    url.searchParams.set("action", "fetch-site-content");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        skipped: false,
        data: null,
      };
    }

    const settings = data?.data?.settings || data?.settings || null;

    return {
      ok: true,
      skipped: false,
      data: settings,
    };
  } catch {
    return {
      ok: false,
      skipped: false,
      data: null,
    };
  }
}

export async function loadAndApplySiteTheme() {
  const storedSettings = getStoredSiteSettings();

  if (storedSettings?.theme) {
    applyThemeVariables(storedSettings.theme);
  } else {
    applyThemeVariables(DEFAULT_THEME_SETTINGS);
  }

  const remoteResult = await fetchRemoteSiteSettings();

  if (remoteResult.ok && remoteResult.data?.theme) {
    const mergedSettings = {
      ...(storedSettings || {}),
      ...remoteResult.data,
      theme: normalizeThemeSettings(remoteResult.data.theme),
    };

    persistSiteSettings(mergedSettings);
    applyThemeVariables(mergedSettings.theme);
  }
}

export function SiteThemeBootstrap() {
  useEffect(() => {
    loadAndApplySiteTheme();
  }, []);

  return null;
}
