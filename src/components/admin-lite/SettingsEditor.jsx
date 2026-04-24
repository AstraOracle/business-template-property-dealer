import { ImageUploadField } from "./ImageUploadField";

const settingsFields = [
  { key: "businessName", label: "Business name" },
  { key: "phone", label: "Phone" },
  { key: "whatsappNumber", label: "WhatsApp number" },
  { key: "email", label: "Email", type: "email" },
  {
    key: "logoUrl",
    label: "Business logo",
    type: "image",
    layout: "full",
    helperText: "Paste the main logo image link used in the navbar and key brand surfaces.",
  },
  {
    key: "heroImageUrl",
    label: "Hero / banner image",
    type: "image",
    layout: "full",
    helperText: "Optional homepage image link for a stronger hero section.",
  },
  {
    key: "mapEmbedUrl",
    label: "Google Maps embed URL",
    type: "textarea",
    layout: "full",
    helperText: "Paste the Google Maps embed URL used on the contact page, not a regular share link.",
  },
  { key: "address", label: "Address", type: "textarea" },
  { key: "heroHeadline", label: "Hero headline", type: "textarea" },
  { key: "heroSubheadline", label: "Hero subheadline", type: "textarea" },
  { key: "primaryCTA", label: "Primary CTA text" },
  { key: "secondaryCTA", label: "Secondary CTA text" },
];

export function SettingsEditor({ values, onChange }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {settingsFields.map((field) => {
        const isTextarea = field.type === "textarea";
        const isImage = field.type === "image";
        const Wrapper = isImage ? "div" : "label";

        return (
          <Wrapper
            key={field.key}
            className={`block space-y-2 ${isTextarea || isImage || field.layout === "full" ? "md:col-span-2" : ""}`}
          >
            <span className="text-sm font-semibold text-[var(--color-text)]">{field.label}</span>
            {isImage ? (
              <ImageUploadField
                value={values[field.key] ?? ""}
                onChange={(nextValue) => onChange(field.key, nextValue)}
                entityType="settings"
                fieldKey={field.key}
                label={field.label}
                helperText={field.helperText}
              />
            ) : isTextarea ? (
              <textarea
                value={values[field.key] ?? ""}
                onChange={(event) => onChange(field.key, event.target.value)}
                rows={4}
                className="form-textarea"
              />
            ) : (
              <input
                type={field.type || "text"}
                value={values[field.key] ?? ""}
                onChange={(event) => onChange(field.key, event.target.value)}
                className="form-control"
              />
            )}
            {field.helperText ? (
              <p className="text-xs leading-6 text-[var(--color-text-soft)]">{field.helperText}</p>
            ) : null}
          </Wrapper>
        );
      })}
    </div>
  );
}
