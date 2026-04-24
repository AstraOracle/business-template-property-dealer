import { siteConfig } from "../config/siteConfig";
import { faqs } from "../data/faqs";
import { localities } from "../data/localities";
import { properties } from "../data/properties";
import { testimonials } from "../data/testimonials";

function mergeObject(target, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      target[key] = value;
    }
  });
}

function replaceArrayContents(target, nextItems) {
  target.splice(0, target.length, ...nextItems);
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeImageList(value, fallback = []) {
  const images = Array.isArray(value) ? value : fallback;
  return images.map((item) => String(item || "").trim()).filter(Boolean);
}

function mergeCollectionWithFallback(remoteItems, fallbackItems, getRemoteKey, getFallbackKey) {
  const fallbackMap = new Map(
    fallbackItems.map((item) => [getFallbackKey(item), item]).filter(([key]) => Boolean(key)),
  );

  return remoteItems.map((item) => {
    const fallbackItem = fallbackMap.get(getRemoteKey(item));
    return fallbackItem ? { ...fallbackItem, ...item } : item;
  });
}

function mergeRemoteContent(remoteData) {
  const remoteSettings = remoteData?.settings || {};
  mergeObject(siteConfig, remoteSettings);

  const nextProperties = mergeCollectionWithFallback(
    toArray(remoteData?.properties),
    properties,
    (item) => item.id || item.slug || item.title,
    (item) => item.id || item.slug || item.title,
  ).map((item) => ({
    ...item,
    galleryImages: normalizeImageList(item.galleryImages, item.galleryImages || []),
  }));

  const nextLocalities = mergeCollectionWithFallback(
    toArray(remoteData?.localities),
    localities,
    (item) => item.id || item.slug || item.name,
    (item) => item.id || item.slug || item.name,
  );

  const nextTestimonials = mergeCollectionWithFallback(
    toArray(remoteData?.testimonials),
    testimonials,
    (item) => item.id || item.name,
    (item) => item.id || item.name,
  );

  const nextFaqs = mergeCollectionWithFallback(
    toArray(remoteData?.faqs),
    faqs,
    (item) => item.id || item.question,
    (item) => item.id || item.question,
  );

  if (nextProperties.length) {
    replaceArrayContents(properties, nextProperties);
  }

  if (nextLocalities.length) {
    replaceArrayContents(localities, nextLocalities);
  }

  if (nextTestimonials.length) {
    replaceArrayContents(testimonials, nextTestimonials);
  }

  if (nextFaqs.length) {
    replaceArrayContents(faqs, nextFaqs);
  }
}

export async function loadRemoteSiteContent() {
  const adminAppsScriptUrl = import.meta.env.VITE_ADMIN_APPS_SCRIPT_URL;

  if (!adminAppsScriptUrl) {
    return {
      ok: false,
      skipped: true,
    };
  }

  try {
    const url = new URL(adminAppsScriptUrl);
    url.searchParams.set("action", "fetch-admin-data");

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
      };
    }

    const remoteData = data?.data || data || {};
    mergeRemoteContent(remoteData);

    return {
      ok: true,
      skipped: false,
    };
  } catch {
    return {
      ok: false,
      skipped: false,
    };
  }
}
