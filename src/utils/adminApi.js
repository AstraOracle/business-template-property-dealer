import { siteConfig } from "../config/siteConfig";
import { faqs } from "../data/faqs";
import { localities } from "../data/localities";
import { properties } from "../data/properties";
import { testimonials } from "../data/testimonials";
import {
  DEFAULT_THEME_SETTINGS,
  normalizeThemeSettings,
  persistSiteSettings,
  SITE_SETTINGS_STORAGE_KEY,
} from "./theme";
import { computeLeadScore } from "./lead";

const ADMIN_APPS_SCRIPT_URL = import.meta.env.VITE_ADMIN_APPS_SCRIPT_URL;
const PUBLIC_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || ADMIN_APPS_SCRIPT_URL;
const ADMIN_LITE_PASSWORD = import.meta.env.VITE_ADMIN_LITE_PASSWORD;
const DEFAULT_ADMIN_PASSWORD = "change-me-admin";
const ADMIN_LOCAL_DATA_STORAGE_KEY = "admin-lite-data";
const ADMIN_SESSION_PASSWORD_STORAGE_KEY = "admin-lite-password";

/*
Sample Apps Script admin payload:
{
  "action": "save-admin-section",
  "section": "properties",
  "saved_at": "2026-04-18T23:59:59.000Z",
  "payload": [
    {
      "id": "prop-001",
      "title": "Camellias Signature Residence",
      "slug": "camellias-signature-residence",
      "priceLabel": "Rs 17.5 Cr onwards",
      "locality": "Golf Course Road",
      "propertyType": "Apartment",
      "purpose": "buy",
      "bedrooms": 4,
      "bathrooms": 5,
      "area": 7350,
      "featuredImage": "https://example.com/image.jpg",
      "featured": true,
      "verified": true,
      "ctaMessage": "Request a curated walkthrough and pricing brief."
    }
  ]
}
*/

const fallbackLeads = [
  {
    id: "lead-001",
    name: "Ritika Sethi",
    phone: "+91 98765 43210",
    intent: "buy",
    leadType: "buy",
    propertyType: "Apartment",
    locality: "Golf Course Road",
    budget: "Rs 15 Cr - Rs 18 Cr",
    timeline: "Within 30 days",
    sourcePage: "Homepage Hero",
    timestamp: "2026-04-18T09:30:00.000Z",
    createdAt: "2026-04-18T09:30:00.000Z",
    lastUpdatedAt: "2026-04-18T09:30:00.000Z",
    status: "New",
    score: "HOT",
    notes: "Looking for a 4BHK primary residence with fast site visit scheduling.",
  },
  {
    id: "lead-002",
    name: "Neha Arora",
    phone: "+91 91234 56789",
    intent: "rent",
    leadType: "rent",
    propertyType: "Apartment",
    locality: "Golf Course Road",
    budget: "Rs 1.5 L - Rs 2.5 L / month",
    timeline: "Immediate",
    sourcePage: "Rent Listings",
    timestamp: "2026-04-18T07:45:00.000Z",
    createdAt: "2026-04-18T07:45:00.000Z",
    lastUpdatedAt: "2026-04-18T10:15:00.000Z",
    status: "Contacted",
    score: "WARM",
    notes: "Corporate relocation requirement with furnished preference.",
  },
  {
    id: "lead-003",
    name: "Vikram Malhotra",
    phone: "+91 99887 76655",
    intent: "sell",
    leadType: "sell",
    propertyType: "Builder Floor",
    locality: "DLF Phase 5",
    budget: "Expected Rs 11 Cr+",
    timeline: "Within 60 days",
    sourcePage: "Sell Property Page",
    timestamp: "2026-04-17T18:20:00.000Z",
    createdAt: "2026-04-17T18:20:00.000Z",
    lastUpdatedAt: "2026-04-18T12:45:00.000Z",
    status: "Closed",
    score: "HOT",
    notes: "Owner wants positioning help and verified buyer outreach.",
  },
];

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeId(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(3, "0")}`;
}

function coerceBoolean(value) {
  return value === true || value === "true";
}

function coerceNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeLeadStatus(value) {
  const normalized = String(value ?? "").trim().toLowerCase().replace(/\s+/g, "_");

  if (normalized === "contacted" || normalized === "follow_up") {
    return "Contacted";
  }

  if (normalized === "closed") {
    return "Closed";
  }

  return "New";
}

function normalizeLeadScore(value, fallback = "WARM") {
  const normalized = String(value ?? "").trim().toUpperCase();

  if (normalized === "HOT" || normalized === "WARM" || normalized === "COLD") {
    return normalized;
  }

  return fallback;
}

function inferLeadScore(item, status) {
  if (item.score) {
    return normalizeLeadScore(item.score);
  }

  if (status === "Closed") {
    return "HOT";
  }

  return computeLeadScore({
    budget: item.budget || item.budget_range || item.expected_price || "",
    timeline: item.timeline || item.timelineToSell || item.timeline_to_sell || "",
    locality: item.locality || item.preferred_locality || "",
    propertyType: item.propertyType || item.property_type || "",
  });
}

function normalizeImageList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 3);
}

function buildDefaultSettings() {
  return {
    businessName: siteConfig.businessName,
    phone: siteConfig.phone,
    whatsappNumber: siteConfig.whatsappNumber,
    email: siteConfig.email,
    address: siteConfig.address,
    heroHeadline: siteConfig.heroHeadline,
    heroSubheadline: siteConfig.heroSubheadline,
    primaryCTA: siteConfig.primaryCTA,
    secondaryCTA: siteConfig.secondaryCTA,
    logoUrl: siteConfig.logoUrl || "",
    heroImageUrl: siteConfig.heroImageUrl || "",
    mapEmbedUrl: siteConfig.mapEmbedUrl || "",
    adminPassword: "",
    theme: normalizeThemeSettings(DEFAULT_THEME_SETTINGS),
  };
}

function getStorageItem(key) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function setStorageItem(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures and keep the admin usable.
  }
}

function getSessionStorageItem(key) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionStorageItem(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Ignore session storage failures and keep admin usable.
  }
}

function removeSessionStorageItem(key) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Ignore session storage failures and keep admin usable.
  }
}

function getStoredAdminData() {
  return getStorageItem(ADMIN_LOCAL_DATA_STORAGE_KEY);
}

function persistAdminDataLocally(data) {
  setStorageItem(ADMIN_LOCAL_DATA_STORAGE_KEY, data);
}

function persistSettingsLocally(settings) {
  const storedSiteSettings = getStorageItem(SITE_SETTINGS_STORAGE_KEY) || {};
  const normalizedSettings = normalizeSettings(settings);

  persistSiteSettings({
    ...storedSiteSettings,
    ...normalizedSettings,
  });
}

function buildBaseAdminData() {
  return {
    settings: buildDefaultSettings(),
    properties: properties.map((item, index) => normalizePropertyItem(item, index)),
    localities: localities.map((item, index) => normalizeLocalityItem(item, index)),
    testimonials: testimonials.map((item, index) => normalizeTestimonialItem(item, index)),
    faqs: faqs.map((item, index) => normalizeFaqItem(item, index)),
  };
}

function buildFallbackAdminData() {
  const storedAdminData = getStoredAdminData();

  if (storedAdminData) {
    return normalizeAdminData(storedAdminData, buildBaseAdminData());
  }

  return buildBaseAdminData();
}

function normalizeSettings(settings = {}) {
  const defaults = buildDefaultSettings();
  const hasExplicitAdminPassword = Object.prototype.hasOwnProperty.call(settings || {}, "adminPassword");
  const nextSettings = {
    ...defaults,
  };

  Object.entries(settings || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      nextSettings[key] = value;
    }
  });

  return {
    ...nextSettings,
    adminPassword: hasExplicitAdminPassword ? resolveAdminPassword(nextSettings.adminPassword) : "",
    theme: normalizeThemeSettings(nextSettings.theme),
  };
}

function normalizePropertyItem(item = {}, index = 0) {
  return {
    id: item.id || makeId("prop", index),
    slug: item.slug || slugify(item.title || `property-${index + 1}`),
    title: item.title || "",
    priceLabel: item.priceLabel || "",
    locality: item.locality || "",
    propertyType: item.propertyType || "",
    purpose: item.purpose || "buy",
    bedrooms: coerceNumber(item.bedrooms),
    bathrooms: coerceNumber(item.bathrooms),
    area: coerceNumber(item.area),
    featuredImage: item.featuredImage || "",
    galleryImages: normalizeImageList(item.galleryImages),
    featured: coerceBoolean(item.featured),
    verified: coerceBoolean(item.verified),
    ctaMessage: item.ctaMessage || "",
  };
}

function normalizeLocalityItem(item = {}, index = 0) {
  return {
    id: item.id || makeId("loc", index),
    slug: item.slug || slugify(item.name || `locality-${index + 1}`),
    name: item.name || "",
    shortDescription: item.shortDescription || "",
    avgPriceLabel: item.avgPriceLabel || "",
    idealFor: item.idealFor || "",
    image: item.image || "",
  };
}

function normalizeTestimonialItem(item = {}, index = 0) {
  return {
    id: item.id || makeId("testi", index),
    name: item.name || "",
    location: item.location || "",
    role: item.role || "",
    quote: item.quote || "",
    avatarImage: item.avatarImage || "",
  };
}

function normalizeFaqItem(item = {}, index = 0) {
  return {
    id: item.id || makeId("faq", index),
    question: item.question || "",
    answer: item.answer || "",
  };
}

function normalizeAdminData(rawData = {}, fallback = buildBaseAdminData()) {

  return {
    settings: normalizeSettings(rawData.settings),
    properties: Array.isArray(rawData.properties)
      ? rawData.properties.map((item, index) => normalizePropertyItem(item, index))
      : fallback.properties,
    localities: Array.isArray(rawData.localities)
      ? rawData.localities.map((item, index) => normalizeLocalityItem(item, index))
      : fallback.localities,
    testimonials: Array.isArray(rawData.testimonials)
      ? rawData.testimonials.map((item, index) => normalizeTestimonialItem(item, index))
      : fallback.testimonials,
    faqs: Array.isArray(rawData.faqs)
      ? rawData.faqs.map((item, index) => normalizeFaqItem(item, index))
      : fallback.faqs,
  };
}

function normalizeLeadItem(item = {}, index = 0) {
  const createdAt = item.createdAt || item.created_at || item.timestamp || item.submitted_at || new Date().toISOString();
  const status = normalizeLeadStatus(item.status);
  const intent = String(item.intent || item.leadType || item.lead_type || "general").trim().toLowerCase();

  return {
    id: item.id || makeId("lead", index),
    name: item.name || item.customer_name || "Unknown lead",
    phone: item.phone || item.customer_phone || "",
    intent,
    leadType: intent,
    propertyType: item.propertyType || item.property_type || "",
    locality: item.locality || item.preferred_locality || "",
    budget: item.budget || item.budget_range || item.expected_price || "",
    timeline: item.timeline || item.timelineToSell || item.timeline_to_sell || "",
    sourcePage: item.sourcePage || item.source_page || "Unknown source",
    timestamp: item.timestamp || createdAt,
    createdAt,
    lastUpdatedAt: item.lastUpdatedAt || item.last_updated_at || item.updatedAt || item.updated_at || createdAt,
    status,
    score: inferLeadScore(item, status),
    notes: item.notes || "",
  };
}

async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchAdminAction(action, { password = "", urlOverride = ADMIN_APPS_SCRIPT_URL } = {}) {
  if (!urlOverride) {
    return {
      ok: false,
      skipped: true,
      error: "Missing Apps Script URL",
    };
  }

  try {
    const url = new URL(urlOverride);
    url.searchParams.set("action", action);
    if (password) {
      url.searchParams.set("password", password);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await parseJsonSafely(response);

    if (!response.ok || data?.success === false) {
      return {
        ok: false,
        skipped: false,
        status: response.status,
        error: data?.message || "Unable to fetch admin resource.",
        data: null,
      };
    }

    return {
      ok: true,
      skipped: false,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      error: error instanceof Error ? error.message : "Network request failed.",
      data: null,
    };
  }
}

async function postAdminAction(action, payload, { password = "" } = {}) {
  if (!ADMIN_APPS_SCRIPT_URL) {
    return {
      ok: false,
      skipped: true,
      error: "Missing VITE_ADMIN_APPS_SCRIPT_URL",
    };
  }

  try {
    const response = await fetch(ADMIN_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        action,
        password,
        saved_at: new Date().toISOString(),
        ...payload,
      }),
    });

    const data = await parseJsonSafely(response);

    if (!response.ok || data?.success === false) {
      return {
        ok: false,
        skipped: false,
        status: response.status,
        error: data?.message || "Admin action failed.",
      };
    }

    return {
      ok: true,
      skipped: false,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      error: error instanceof Error ? error.message : "Network request failed.",
    };
  }
}

async function postAdminSection(section, payload, { password = "" } = {}) {
  return postAdminAction("save-admin-section", {
    section,
    payload,
  }, { password });
}

export function getDefaultAdminPassword() {
  return ADMIN_LITE_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export function resolveAdminPassword(password) {
  const trimmedPassword = String(password || "").trim();
  return trimmedPassword || getDefaultAdminPassword();
}

export function getAdminLitePassword(settings) {
  if (settings?.adminPassword) {
    return resolveAdminPassword(settings.adminPassword);
  }

  const storedSiteSettings = getStorageItem(SITE_SETTINGS_STORAGE_KEY);

  if (storedSiteSettings?.adminPassword) {
    return resolveAdminPassword(storedSiteSettings.adminPassword);
  }

  const storedAdminData = getStoredAdminData();

  if (storedAdminData?.settings?.adminPassword) {
    return resolveAdminPassword(storedAdminData.settings.adminPassword);
  }

  return getDefaultAdminPassword();
}

export function getAdminSessionPassword() {
  return String(getSessionStorageItem(ADMIN_SESSION_PASSWORD_STORAGE_KEY) || "").trim();
}

export function setAdminSessionPassword(password) {
  const trimmedPassword = String(password || "").trim();

  if (!trimmedPassword) {
    return;
  }

  setSessionStorageItem(ADMIN_SESSION_PASSWORD_STORAGE_KEY, trimmedPassword);
}

export function clearAdminSessionPassword() {
  removeSessionStorageItem(ADMIN_SESSION_PASSWORD_STORAGE_KEY);
}

export async function verifyAdminPassword(password) {
  const trimmedPassword = String(password || "").trim();

  if (!trimmedPassword) {
    return {
      ok: false,
      skipped: false,
      error: "Admin password is required.",
    };
  }

  if (!ADMIN_APPS_SCRIPT_URL) {
    return {
      ok: trimmedPassword === getDefaultAdminPassword(),
      skipped: true,
      source: "local",
      error: trimmedPassword === getDefaultAdminPassword() ? "" : "Incorrect password.",
    };
  }

  const result = await postAdminAction("verify-admin-password", {}, { password: trimmedPassword });

  if (result.ok && result.data?.success !== false) {
    setAdminSessionPassword(trimmedPassword);
    return {
      ok: true,
      skipped: false,
      source: "remote",
    };
  }

  return {
    ok: false,
    skipped: false,
    error: result.error || result.data?.message || "Incorrect password.",
  };
}

export function getFallbackAdminData() {
  return buildFallbackAdminData();
}

export async function fetchAdminSettings() {
  if (PUBLIC_APPS_SCRIPT_URL) {
    const result = await fetchAdminAction("fetch-site-content", {
      urlOverride: PUBLIC_APPS_SCRIPT_URL,
    });

    if (result.ok) {
      return {
        ok: true,
        skipped: false,
        source: "remote",
        data: normalizeSettings(result.data?.data?.settings || result.data?.settings || {}),
      };
    }
  }

  return {
    ok: true,
    skipped: true,
    source: "local",
    data: buildFallbackAdminData().settings,
  };
}

export async function fetchAdminData(password = getAdminSessionPassword()) {
  if (!ADMIN_APPS_SCRIPT_URL) {
    const fallbackData = buildFallbackAdminData();

    return {
      ok: true,
      skipped: true,
      source: "local",
      data: fallbackData,
    };
  }

  const result = await fetchAdminAction("fetch-admin-data", { password });

  if (!result.ok) {
    const fallbackData = buildFallbackAdminData();

    return {
      ...result,
      data: fallbackData,
    };
  }

  const normalizedData = normalizeAdminData(result.data?.data || result.data);

  persistAdminDataLocally(normalizedData);
  persistSettingsLocally(normalizedData.settings);

  return {
    ok: true,
    skipped: false,
    source: "remote",
    data: normalizedData,
  };
}

export async function fetchLeadInbox() {
  if (!ADMIN_APPS_SCRIPT_URL) {
    return {
      ok: true,
      skipped: true,
      source: "local",
      data: fallbackLeads.map((item, index) => normalizeLeadItem(item, index)),
    };
  }

  const result = await fetchAdminAction("fetch-leads", {
    password: getAdminSessionPassword(),
  });

  if (!result.ok) {
    return {
      ...result,
      data: fallbackLeads.map((item, index) => normalizeLeadItem(item, index)),
    };
  }

  const rawLeads = result.data?.data || result.data?.leads || result.data;

  return {
    ok: true,
    skipped: false,
    source: "remote",
    data: Array.isArray(rawLeads)
      ? rawLeads.map((item, index) => normalizeLeadItem(item, index))
      : fallbackLeads.map((item, index) => normalizeLeadItem(item, index)),
  };
}

export async function updateLeadStatus(leadId, status) {
  const password = getAdminSessionPassword();
  return postAdminAction("update-lead-status", {
    lead_id: leadId,
    status,
  }, { password });
}


export async function saveSettings(payload) {
  const normalizedPayload = normalizeSettings(payload);
  const currentAdminData = buildFallbackAdminData();
  const nextAdminData = {
    ...currentAdminData,
    settings: normalizedPayload,
  };

  persistAdminDataLocally(nextAdminData);
  persistSettingsLocally(normalizedPayload);

  const result = await postAdminSection("settings", normalizedPayload, {
    password: getAdminSessionPassword(),
  });

  return result;
}

export async function saveProperties(payload) {
  const normalizedPayload = payload.map((item, index) => normalizePropertyItem(item, index));
  const currentAdminData = buildFallbackAdminData();

  persistAdminDataLocally({
    ...currentAdminData,
    properties: normalizedPayload,
  });

  return postAdminSection("properties", normalizedPayload, {
    password: getAdminSessionPassword(),
  });
}

export async function saveLocalities(payload) {
  const normalizedPayload = payload.map((item, index) => normalizeLocalityItem(item, index));
  const currentAdminData = buildFallbackAdminData();

  persistAdminDataLocally({
    ...currentAdminData,
    localities: normalizedPayload,
  });

  return postAdminSection("localities", normalizedPayload, {
    password: getAdminSessionPassword(),
  });
}

export async function saveTestimonials(payload) {
  const normalizedPayload = payload.map((item, index) => normalizeTestimonialItem(item, index));
  const currentAdminData = buildFallbackAdminData();

  persistAdminDataLocally({
    ...currentAdminData,
    testimonials: normalizedPayload,
  });

  return postAdminSection("testimonials", normalizedPayload, {
    password: getAdminSessionPassword(),
  });
}

export async function saveFaq(payload) {
  const normalizedPayload = payload.map((item, index) => normalizeFaqItem(item, index));
  const currentAdminData = buildFallbackAdminData();

  persistAdminDataLocally({
    ...currentAdminData,
    faqs: normalizedPayload,
  });

  return postAdminSection("faqs", normalizedPayload, {
    password: getAdminSessionPassword(),
  });
}

export async function saveThemeSettings(themePayload, currentSettings = {}) {
  const normalizedSettings = normalizeSettings({
    ...currentSettings,
    theme: themePayload,
  });

  return saveSettings(normalizedSettings);
}

export async function updateAdminPassword(currentPassword, newPassword, currentSettings = {}) {
  const normalizedSettings = normalizeSettings({
    ...currentSettings,
    adminPassword: newPassword,
  });

  persistSettingsLocally(normalizedSettings);
  persistAdminDataLocally({
    ...buildFallbackAdminData(),
    settings: normalizedSettings,
  });

  const result = await postAdminAction("update-admin-password", {
    payload: {
      currentPassword,
      adminPassword: normalizedSettings.adminPassword,
    },
  }, {
    password: getAdminSessionPassword(),
  });

  if (!result.ok && !result.skipped) {
    return result;
  }

  setAdminSessionPassword(normalizedSettings.adminPassword);

  return {
    ...result,
    data: normalizedSettings,
  };
}
