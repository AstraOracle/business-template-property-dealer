import { useEffect, useMemo, useState } from "react";
import { AdminPasswordGate } from "../components/admin-lite/AdminPasswordGate";
import { AdminShell } from "../components/admin-lite/AdminShell";
import { AdminSidebar } from "../components/admin-lite/AdminSidebar";
import { AppearanceSettingsEditor } from "../components/admin-lite/AppearanceSettingsEditor";
import { CollectionEditor } from "../components/admin-lite/CollectionEditor";
import { EditorSection } from "../components/admin-lite/EditorSection";
import { LeadInboxFilters } from "../components/admin-lite/LeadInboxFilters";
import { LeadInboxList } from "../components/admin-lite/LeadInboxList";
import { SecuritySettingsEditor } from "../components/admin-lite/SecuritySettingsEditor";
import { SettingsEditor } from "../components/admin-lite/SettingsEditor";
import {
  fetchAdminData,
  fetchAdminSettings,
  fetchLeadInbox,
  getAdminLitePassword,
  getFallbackAdminData,
  saveFaq,
  saveLocalities,
  saveProperties,
  saveSettings,
  saveThemeSettings,
  saveTestimonials,
  updateAdminPassword,
  updateLeadStatus,
} from "../utils/adminApi";
import {
  generateLeadInboxWhatsAppLink,
  generateScheduleVisitWhatsAppLink,
  generateSendOptionsWhatsAppLink,
} from "../utils/adminLeadMessages";
import { applyThemeVariables, DEFAULT_THEME_SETTINGS, normalizeThemeSettings, validateThemeSettings } from "../utils/theme";

const ADMIN_SESSION_KEY = "admin-lite-session";

const sectionDefinitions = [
  { id: "settings", label: "Settings" },
  { id: "appearance", label: "Appearance" },
  { id: "security", label: "Admin Security" },
  { id: "properties", label: "Properties" },
  { id: "localities", label: "Localities" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQ" },
  { id: "leadInbox", label: "Lead Inbox" },
];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60";

const initialAdminState = {
  settings: {
    businessName: "",
    phone: "",
    whatsappNumber: "",
    email: "",
    address: "",
    heroHeadline: "",
    heroSubheadline: "",
    primaryCTA: "",
    secondaryCTA: "",
    adminPassword: "",
    theme: DEFAULT_THEME_SETTINGS,
  },
  properties: [],
  localities: [],
  testimonials: [],
  faqs: [],
};

const fallbackAdminState = getFallbackAdminData();

const propertyFields = [
  { key: "title", label: "Title" },
  { key: "priceLabel", label: "Price" },
  { key: "locality", label: "Locality" },
  { key: "propertyType", label: "Property type" },
  {
    key: "purpose",
    label: "Purpose",
    type: "select",
    options: [
      { label: "Buy", value: "buy" },
      { label: "Rent", value: "rent" },
    ],
  },
  { key: "bedrooms", label: "Beds", type: "number" },
  { key: "bathrooms", label: "Baths", type: "number" },
  { key: "area", label: "Area", type: "number" },
  {
    key: "featuredImage",
    label: "Featured image",
    type: "image",
    layout: "full",
    entityType: "properties",
    helperText: "Main listing image used on cards and detail pages.",
  },
  {
    key: "galleryImages",
    label: "Gallery images",
    type: "image-list",
    layout: "full",
    entityType: "properties",
    maxItems: 3,
    itemLabel: "Gallery slot",
    helperText: "Keep this simple: add up to three optional gallery image links.",
  },
  { key: "featured", label: "Featured", type: "checkbox", checkboxLabel: "Featured listing" },
  { key: "verified", label: "Verified", type: "checkbox", checkboxLabel: "Verified listing" },
  { key: "ctaMessage", label: "CTA message", type: "textarea" },
];

const localityFields = [
  { key: "name", label: "Name" },
  { key: "slug", label: "Slug" },
  { key: "shortDescription", label: "Short description", type: "textarea" },
  { key: "avgPriceLabel", label: "Average price label" },
  { key: "idealFor", label: "Ideal for", type: "textarea" },
  {
    key: "image",
    label: "Locality image",
    type: "image",
    layout: "full",
    entityType: "localities",
    helperText: "Used on locality cards and locality detail pages.",
  },
];

const testimonialFields = [
  { key: "name", label: "Name" },
  { key: "location", label: "Location" },
  { key: "role", label: "Role" },
  {
    key: "avatarImage",
    label: "Avatar image",
    type: "image",
    layout: "full",
    entityType: "testimonials",
    helperText: "Optional client-style portrait or avatar for social proof.",
  },
  { key: "quote", label: "Quote", type: "textarea" },
];

const faqFields = [
  { key: "question", label: "Question", type: "textarea" },
  { key: "answer", label: "Answer", type: "textarea" },
];

function createEmptyItem(section) {
  if (section === "properties") {
    return {
      id: `prop-${Date.now()}`,
      title: "",
      priceLabel: "",
      locality: "",
      propertyType: "",
      purpose: "buy",
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      featuredImage: "",
      galleryImages: [],
      featured: false,
      verified: false,
      ctaMessage: "",
    };
  }

  if (section === "localities") {
    return {
      id: `loc-${Date.now()}`,
      name: "",
      slug: "",
      shortDescription: "",
      avgPriceLabel: "",
      idealFor: "",
      image: "",
    };
  }

  if (section === "testimonials") {
    return {
      id: `testi-${Date.now()}`,
      name: "",
      location: "",
      role: "",
      avatarImage: "",
      quote: "",
    };
  }

  return {
    id: `faq-${Date.now()}`,
    question: "",
    answer: "",
  };
}

export function AdminLitePage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  });
  const [activeSection, setActiveSection] = useState("settings");
  const [adminData, setAdminData] = useState(fallbackAdminState || initialAdminState);
  const [configuredPassword, setConfiguredPassword] = useState(() => getAdminLitePassword());
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveStatus, setSaveStatus] = useState({});
  const [leads, setLeads] = useState([]);
  const [isLeadLoading, setIsLeadLoading] = useState(false);
  const [leadLoadError, setLeadLoadError] = useState("");
  const [leadFilters, setLeadFilters] = useState({ leadType: "all", locality: "all" });
  const [updatingLeadId, setUpdatingLeadId] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPasswordSettings() {
      const result = await fetchAdminSettings();

      if (!isMounted) {
        return;
      }

      if (result.data) {
        setAdminData((current) => ({
          ...current,
          settings: result.data,
        }));
        setConfiguredPassword(getAdminLitePassword(result.data));
        applyThemeVariables(result.data.theme);
      }
    }

    loadPasswordSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    let isMounted = true;

    async function loadAdminData() {
      setIsRefreshing(true);
      setIsLeadLoading(true);
      setLoadError("");
      setLeadLoadError("");

      const [result, leadResult] = await Promise.all([fetchAdminData(), fetchLeadInbox()]);

      if (!isMounted) {
        return;
      }

      if (result.data) {
        setAdminData(result.data);
        setConfiguredPassword(getAdminLitePassword(result.data.settings));
        applyThemeVariables(result.data.settings.theme);
      }

      if (!result.ok && result.error) {
        setLoadError(`${result.error} Showing the current saved site content.`);
      } else if (result.skipped) {
        setLoadError("Showing the current site content because the live admin connection is not configured yet.");
      }

      if (leadResult.data) {
        setLeads(leadResult.data);
      }

      if (!leadResult.ok && leadResult.error) {
        setLeadLoadError(`${leadResult.error} Showing the current saved lead list.`);
      } else if (leadResult.skipped) {
        setLeadLoadError("Showing the current lead list because the live admin connection is not configured yet.");
      }

      setIsRefreshing(false);
      setIsLeadLoading(false);
    }

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, [isUnlocked]);

  function handleUnlock(inputPassword) {
    if (!configuredPassword || inputPassword !== configuredPassword) {
      return false;
    }

    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setIsUnlocked(true);
    return true;
  }

  function handleLogout() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsUnlocked(false);
    setActiveSection("settings");
      setLeadFilters({ leadType: "all", locality: "all" });
      setSaveStatus({});
      setUpdatingLeadId("");
      setIsRefreshing(false);
      setIsLeadLoading(false);
  }

  function updateLeadFilter(key, value) {
    setLeadFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateSettings(key, value) {
    setAdminData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [key]: value,
      },
    }));
  }

  function updateThemeSetting(key, value) {
    setAdminData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        theme: {
          ...normalizeThemeSettings(current.settings.theme),
          [key]: value,
        },
      },
    }));
  }

  function updateCollectionItem(section, index, key, value) {
    setAdminData((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    }));
  }

  function addCollectionItem(section) {
    setAdminData((current) => ({
      ...current,
      [section]: [...current[section], createEmptyItem(section)],
    }));
  }

  function deleteCollectionItem(section, index) {
    setAdminData((current) => ({
      ...current,
      [section]: current[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  async function handleCollectionSave(section) {
    setSaveStatus((current) => ({
      ...current,
      [section]: {
        isSaving: true,
        message: "",
        error: "",
      },
    }));

    let result;

    if (section === "properties") {
      result = await saveProperties(adminData.properties);
    }

    if (section === "localities") {
      result = await saveLocalities(adminData.localities);
    }

    if (section === "testimonials") {
      result = await saveTestimonials(adminData.testimonials);
    }

    if (section === "faqs") {
      result = await saveFaq(adminData.faqs);
    }

    setSaveStatus((current) => ({
      ...current,
      [section]: {
        isSaving: false,
        message: result?.ok
          ? `Saved ${section} successfully.`
          : result?.skipped
            ? "Live admin sync is not configured yet. Your edits remain available in this browser session."
            : "",
        error: result && !result.ok && !result.skipped ? result.error || "Save failed." : "",
      },
    }));
  }

  async function handleSaveBusinessSettings() {
    setSaveStatus((current) => ({
      ...current,
      settings: {
        isSaving: true,
        message: "",
        error: "",
      },
    }));

    const result = await saveSettings(adminData.settings);

    setSaveStatus((current) => ({
      ...current,
      settings: {
        isSaving: false,
        message: result.ok
          ? "Saved settings successfully."
          : result.skipped
            ? "Live admin sync is not configured yet. Settings were saved only in this browser."
            : "",
        error: !result.ok && !result.skipped ? result.error || "Unable to save settings." : "",
      },
    }));
  }

  async function handleSaveAppearance() {
    const nextTheme = normalizeThemeSettings(adminData.settings.theme);
    const validation = validateThemeSettings(nextTheme);

    if (!validation.ok) {
      setSaveStatus((current) => ({
        ...current,
        appearance: {
          isSaving: false,
          message: "",
          error: validation.error,
        },
      }));
      return;
    }

    setSaveStatus((current) => ({
      ...current,
      appearance: {
        isSaving: true,
        message: "",
        error: "",
      },
    }));

    applyThemeVariables(validation.normalizedTheme);

    const result = await saveThemeSettings(validation.normalizedTheme, adminData.settings);

    if (result.ok || result.skipped) {
      setAdminData((current) => ({
        ...current,
        settings: {
          ...current.settings,
          theme: validation.normalizedTheme,
        },
      }));
    }

    setSaveStatus((current) => ({
      ...current,
      appearance: {
        isSaving: false,
        message: result.ok
          ? "Saved appearance settings successfully."
          : result.skipped
            ? "Live admin sync is not configured yet. Appearance changes were saved only in this browser."
            : "",
        error: !result.ok && !result.skipped ? result.error || "Unable to save appearance settings." : "",
      },
    }));
  }

  function handleResetTheme() {
    const nextTheme = normalizeThemeSettings(DEFAULT_THEME_SETTINGS);

    setAdminData((current) => ({
      ...current,
      settings: {
        ...current.settings,
        theme: nextTheme,
      },
    }));
    applyThemeVariables(nextTheme);
    setSaveStatus((current) => ({
      ...current,
      appearance: {
        isSaving: false,
        message: "Theme reset to the default site look. Save appearance to keep it.",
        error: "",
      },
    }));
  }

  async function handlePasswordUpdate(formValues) {
    if (formValues.currentPassword !== configuredPassword) {
      setSaveStatus((current) => ({
        ...current,
        security: {
          isSaving: false,
          message: "",
          error: "Current password does not match the active admin password.",
        },
      }));
      return { ok: false };
    }

    if (formValues.newPassword.trim().length < 8) {
      setSaveStatus((current) => ({
        ...current,
        security: {
          isSaving: false,
          message: "",
          error: "New password should be at least 8 characters long.",
        },
      }));
      return { ok: false };
    }

    if (formValues.newPassword !== formValues.confirmPassword) {
      setSaveStatus((current) => ({
        ...current,
        security: {
          isSaving: false,
          message: "",
          error: "New password and confirm password do not match.",
        },
      }));
      return { ok: false };
    }

    setSaveStatus((current) => ({
      ...current,
      security: {
        isSaving: true,
        message: "",
        error: "",
      },
    }));

    const result = await updateAdminPassword(formValues.newPassword, adminData.settings);

    if (result.ok || result.skipped) {
      setConfiguredPassword(formValues.newPassword);
      setAdminData((current) => ({
        ...current,
        settings: {
          ...current.settings,
          adminPassword: formValues.newPassword,
        },
      }));
    }

    setSaveStatus((current) => ({
      ...current,
      security: {
        isSaving: false,
        message: result.ok
          ? "Admin password updated successfully."
          : result.skipped
            ? "Live admin sync is not configured yet. Password was saved only in this browser."
            : "",
        error: !result.ok && !result.skipped ? result.error || "Unable to update admin password." : "",
      },
    }));

    return {
      ok: result.ok || result.skipped,
    };
  }

  const leadTypeOptions = useMemo(() => {
    return ["all", ...new Set(leads.map((lead) => lead.leadType).filter(Boolean))];
  }, [leads]);

  const localityOptions = useMemo(() => {
    return ["all", ...new Set(leads.map((lead) => lead.locality).filter(Boolean))];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return [...leads]
      .filter((lead) => leadFilters.leadType === "all" || lead.leadType === leadFilters.leadType)
      .filter((lead) => leadFilters.locality === "all" || lead.locality === leadFilters.locality)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [leadFilters, leads]);

  if (!isUnlocked) {
    return (
      <AdminPasswordGate
        hasConfiguredPassword={Boolean(configuredPassword)}
        helperText="Use the current admin password to open the hidden editor."
        isLoading={isPasswordLoading}
        onUnlock={handleUnlock}
      />
    );
  }

  async function handleMarkContacted(lead) {
    setUpdatingLeadId(lead.id);

    try {
      const result = await updateLeadStatus(lead.id, "contacted");

      if (result.ok || result.skipped) {
        setLeads((current) =>
          current.map((item) =>
            item.id === lead.id
              ? {
                  ...item,
                  status: "contacted",
                }
              : item,
          ),
        );
      }

      setSaveStatus((current) => ({
        ...current,
        leadInbox: {
          isSaving: false,
          message: result.ok
            ? "Lead status updated successfully."
            : result.skipped
              ? "Live admin sync is not configured yet. Lead status was updated only in this browser session."
              : "",
          error: !result.ok && !result.skipped ? result.error || "Unable to update lead status." : "",
        },
      }));
    } finally {
      setUpdatingLeadId("");
    }
  }

  return (
    <AdminShell
      sidebar={
        <AdminSidebar
          sections={sectionDefinitions}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onLogout={handleLogout}
        />
      }
    >
      {isRefreshing ? (
        <div className="premium-card rounded-[32px] p-6 text-sm text-[var(--color-text-soft)] sm:p-8">
          Syncing the latest admin data...
        </div>
      ) : null}

      {activeSection === "settings" ? (
        <EditorSection
          eyebrow="Settings"
          title="Business details and homepage copy"
          description="Update the business details and homepage copy a dealer is most likely to change regularly."
          statusMessage={saveStatus.settings?.message || loadError}
          errorMessage={saveStatus.settings?.error}
          actions={
            <button
              type="button"
              onClick={handleSaveBusinessSettings}
              disabled={saveStatus.settings?.isSaving}
              className={primaryButtonClass}
            >
              {saveStatus.settings?.isSaving ? "Saving..." : "Save settings"}
            </button>
          }
        >
          <SettingsEditor values={adminData.settings} onChange={updateSettings} />
        </EditorSection>
      ) : null}

      {activeSection === "appearance" ? (
        <EditorSection
          eyebrow="Appearance"
          title="Site colors and branding feel"
          description="Pick the site look and button color without making the design feel inconsistent."
          statusMessage={saveStatus.appearance?.message}
          errorMessage={saveStatus.appearance?.error}
          actions={
            <button
              type="button"
              onClick={handleSaveAppearance}
              disabled={saveStatus.appearance?.isSaving}
              className={primaryButtonClass}
            >
              {saveStatus.appearance?.isSaving ? "Saving..." : "Save appearance"}
            </button>
          }
        >
          <AppearanceSettingsEditor
            values={normalizeThemeSettings(adminData.settings.theme)}
            onChange={updateThemeSetting}
            onReset={handleResetTheme}
          />
        </EditorSection>
      ) : null}

      {activeSection === "security" ? (
        <EditorSection
          eyebrow="Admin security"
          title="Change the hidden admin password"
          description="Keep the hidden editor protected with one simple password that can be updated here."
          statusMessage={saveStatus.security?.message}
          errorMessage={saveStatus.security?.error}
        >
          <SecuritySettingsEditor
            isSaving={saveStatus.security?.isSaving}
            onSubmit={handlePasswordUpdate}
          />
        </EditorSection>
      ) : null}

      {activeSection === "properties" ? (
        <EditorSection
          eyebrow="Properties"
          title="Manage listing highlights"
          description="Add, refine, or remove property cards that drive the buy, rent, and detail page experience."
          statusMessage={saveStatus.properties?.message || loadError}
          errorMessage={saveStatus.properties?.error}
        >
          <CollectionEditor
            items={adminData.properties}
            fields={propertyFields}
            addLabel="Add property"
            saveLabel="Save properties"
            isSaving={saveStatus.properties?.isSaving}
            emptyLabel="No properties yet. Add the first listing here."
            getItemTitle={(item, index) => item.title || `Property ${index + 1}`}
            getItemSubtitle={(item) => `${item.purpose || "buy"} | ${item.locality || "Locality pending"}`}
            onAdd={() => addCollectionItem("properties")}
            onDelete={(index) => deleteCollectionItem("properties", index)}
            onChangeItem={(index, key, value) => updateCollectionItem("properties", index, key, value)}
            onSave={() => handleCollectionSave("properties")}
          />
        </EditorSection>
      ) : null}

      {activeSection === "localities" ? (
        <EditorSection
          eyebrow="Localities"
          title="Manage locality landing content"
          description="Keep micro-market pages fresh with editable intros, ideal buyer fit, and price labels."
          statusMessage={saveStatus.localities?.message || loadError}
          errorMessage={saveStatus.localities?.error}
        >
          <CollectionEditor
            items={adminData.localities}
            fields={localityFields}
            addLabel="Add locality"
            saveLabel="Save localities"
            isSaving={saveStatus.localities?.isSaving}
            emptyLabel="No localities yet. Add the first locality here."
            getItemTitle={(item, index) => item.name || `Locality ${index + 1}`}
            getItemSubtitle={(item) => item.slug || "Slug pending"}
            onAdd={() => addCollectionItem("localities")}
            onDelete={(index) => deleteCollectionItem("localities", index)}
            onChangeItem={(index, key, value) => updateCollectionItem("localities", index, key, value)}
            onSave={() => handleCollectionSave("localities")}
          />
        </EditorSection>
      ) : null}

      {activeSection === "testimonials" ? (
        <EditorSection
          eyebrow="Testimonials"
          title="Manage trust-building client quotes"
          description="Edit premium testimonial copy and source lines used across the site."
          statusMessage={saveStatus.testimonials?.message || loadError}
          errorMessage={saveStatus.testimonials?.error}
        >
          <CollectionEditor
            items={adminData.testimonials}
            fields={testimonialFields}
            addLabel="Add testimonial"
            saveLabel="Save testimonials"
            isSaving={saveStatus.testimonials?.isSaving}
            emptyLabel="No testimonials yet. Add the first testimonial here."
            getItemTitle={(item, index) => item.name || `Testimonial ${index + 1}`}
            getItemSubtitle={(item) => item.role || item.location || "Client source pending"}
            onAdd={() => addCollectionItem("testimonials")}
            onDelete={(index) => deleteCollectionItem("testimonials", index)}
            onChangeItem={(index, key, value) => updateCollectionItem("testimonials", index, key, value)}
            onSave={() => handleCollectionSave("testimonials")}
          />
        </EditorSection>
      ) : null}

      {activeSection === "faqs" ? (
        <EditorSection
          eyebrow="FAQ"
          title="Manage frequently asked questions"
          description="Keep objection-handling and informational content current without changing the public code structure."
          statusMessage={saveStatus.faqs?.message || loadError}
          errorMessage={saveStatus.faqs?.error}
        >
          <CollectionEditor
            items={adminData.faqs}
            fields={faqFields}
            addLabel="Add FAQ"
            saveLabel="Save FAQ"
            isSaving={saveStatus.faqs?.isSaving}
            emptyLabel="No FAQs yet. Add the first question here."
            getItemTitle={(item, index) => item.question || `FAQ ${index + 1}`}
            getItemSubtitle={() => "Public site FAQ content"}
            onAdd={() => addCollectionItem("faqs")}
            onDelete={(index) => deleteCollectionItem("faqs", index)}
            onChangeItem={(index, key, value) => updateCollectionItem("faqs", index, key, value)}
            onSave={() => handleCollectionSave("faqs")}
          />
        </EditorSection>
      ) : null}

      {activeSection === "leadInbox" ? (
        <EditorSection
          eyebrow="Lead Inbox"
          title="A lightweight inbox for high-intent enquiries"
          description="Review incoming enquiries, filter them quickly, and trigger WhatsApp follow-up actions from one place."
          statusMessage={saveStatus.leadInbox?.message || leadLoadError || (isLeadLoading ? "Syncing live lead inbox..." : "")}
          errorMessage={saveStatus.leadInbox?.error}
        >
          <LeadInboxFilters
            leadType={leadFilters.leadType}
            locality={leadFilters.locality}
            leadTypeOptions={leadTypeOptions}
            localityOptions={localityOptions}
            onChange={updateLeadFilter}
          />
          <LeadInboxList
            leads={filteredLeads}
            isUpdating={updatingLeadId}
            onMarkContacted={handleMarkContacted}
            getOpenWhatsAppLink={generateLeadInboxWhatsAppLink}
            getSendOptionsLink={generateSendOptionsWhatsAppLink}
            getScheduleVisitLink={generateScheduleVisitWhatsAppLink}
          />
        </EditorSection>
      ) : null}
    </AdminShell>
  );
}
