import { useState } from "react";
import { LeadSubmissionState } from "../lead/LeadSubmissionState";
import {
  buildLeadWhatsAppUrl,
  buildLeadPayload,
  prepareGoogleSheetsPayload,
} from "../../utils/lead";
import { submitLeadToSheet } from "../../utils/leadApi";

const propertyTypeOptions = ["Apartment", "Builder Floor", "Villa", "Plot", "Luxury Residence", "Commercial"];
const timelineOptions = ["Immediate", "Within 30 days", "Within 60 days", "Within 90 days", "Just exploring"];

const defaultValues = {
  intent: "sell",
  propertyType: "",
  sellLocality: "",
  expectedPrice: "",
  timelineToSell: "",
  name: "",
  phone: "",
  notes: "",
};

function validatePhone(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits.length >= 10;
}

export function SellerLeadForm({ sourcePage, city, businessName, whatsappNumber, onLeadReady }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  function updateValue(key, value) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setSubmissionResult(null);
    onLeadReady?.(null);
  }

  function validate() {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Enter the owner name.";
    }
    if (!validatePhone(values.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!values.propertyType) {
      nextErrors.propertyType = "Select the property type.";
    }
    if (!values.sellLocality.trim()) {
      nextErrors.sellLocality = "Enter the property locality.";
    }
    if (!values.expectedPrice.trim()) {
      nextErrors.expectedPrice = "Enter the expected price.";
    }
    if (!values.timelineToSell) {
      nextErrors.timelineToSell = "Choose the selling timeline.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || !validate()) {
      return;
    }

    setIsSubmitting(true);
    let payload = null;

    try {
      payload = buildLeadPayload({
        formData: values,
        metadata: {
          sourcePage,
          city,
          businessName,
        },
      });
      const whatsappUrl = buildLeadWhatsAppUrl(whatsappNumber, payload);
      const googleSheetsPayload = prepareGoogleSheetsPayload(payload);
      const sheetSubmission = await submitLeadToSheet(googleSheetsPayload);

      const finalResult = {
        status: sheetSubmission.ok ? "success" : "error",
        payload,
        googleSheetsPayload,
        whatsappUrl,
        sheetSubmission,
      };

      setSubmissionResult(finalResult);
      onLeadReady?.(finalResult);
    } catch (error) {
      const fallbackPayload =
        payload ||
        buildLeadPayload({
          formData: values,
          metadata: {
            sourcePage,
            city,
            businessName,
          },
        });

      const finalResult = {
        status: "error",
        payload: fallbackPayload,
        googleSheetsPayload: prepareGoogleSheetsPayload(fallbackPayload),
        whatsappUrl: buildLeadWhatsAppUrl(whatsappNumber, fallbackPayload),
        sheetSubmission: {
          ok: false,
          status: 0,
          error: error instanceof Error ? error.message : "Could not save lead to system.",
        },
      };

      setSubmissionResult(finalResult);
      onLeadReady?.(finalResult);
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderFieldError(key) {
    if (!errors[key]) {
      return null;
    }

    return <p className="text-sm text-[#b65038]">{errors[key]}</p>;
  }

  if (submissionResult) {
    if (submissionResult.status === "success") {
      return (
        <LeadSubmissionState
          status="success"
          title="Lead saved successfully"
          message="Your seller lead has been recorded in the system. Continue to WhatsApp so the advisory team can take the next step with you."
          payload={submissionResult.payload}
          actionLabel="Continue to WhatsApp"
          actionHref={submissionResult.whatsappUrl}
          secondaryLabel="Submit another seller lead"
          onSecondaryAction={resetForm}
        />
      );
    }

    return (
      <LeadSubmissionState
        status="error"
        title="Could not save lead to system"
        message="The seller lead was not saved to Google Sheets. You can still continue to WhatsApp so the seller conversation is not delayed."
        payload={submissionResult.payload}
        actionLabel="Continue to WhatsApp anyway"
        actionHref={submissionResult.whatsappUrl}
        actionVariant="secondary"
        secondaryLabel="Submit another seller lead"
        onSecondaryAction={resetForm}
        errorMessage={submissionResult.sheetSubmission.error}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="premium-card rounded-[32px] p-6 sm:p-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            Seller lead form
          </p>
          <h3 className="section-title text-3xl font-semibold text-[var(--color-text)]">Share your property details</h3>
          <p className="text-sm leading-7 text-[var(--color-text-soft)]">
            Help us assess your property, buyer positioning, and ideal go-to-market timeline.
          </p>
          <p className="text-sm leading-7 text-[var(--color-text-soft)]">
            Your details stay with the advisory team and are used only to shape a faster, more qualified selling conversation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Owner name</span>
            <input
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              className="form-control"
              autoComplete="name"
              placeholder="Enter owner name"
              disabled={isSubmitting}
            />
            {renderFieldError("name")}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Phone</span>
            <input
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              className="form-control"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              disabled={isSubmitting}
            />
            {renderFieldError("phone")}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Property type</span>
            <select
              value={values.propertyType}
              onChange={(event) => updateValue("propertyType", event.target.value)}
              className="form-select"
              disabled={isSubmitting}
            >
              <option value="">Select property type</option>
              {propertyTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {renderFieldError("propertyType")}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Locality</span>
            <input
              value={values.sellLocality}
              onChange={(event) => updateValue("sellLocality", event.target.value)}
              className="form-control"
              placeholder="Golf Course Road, Worli..."
              disabled={isSubmitting}
            />
            {renderFieldError("sellLocality")}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Expected price</span>
            <input
              value={values.expectedPrice}
              onChange={(event) => updateValue("expectedPrice", event.target.value)}
              className="form-control"
              placeholder="Rs 4.5 Cr"
              disabled={isSubmitting}
            />
            {renderFieldError("expectedPrice")}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Timeline to sell</span>
            <select
              value={values.timelineToSell}
              onChange={(event) => updateValue("timelineToSell", event.target.value)}
              className="form-select"
              disabled={isSubmitting}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {renderFieldError("timelineToSell")}
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">Notes (optional)</span>
          <textarea
            value={values.notes}
            onChange={(event) => updateValue("notes", event.target.value)}
            className="form-textarea"
            placeholder="Share any pricing goals, urgency, or current listing context..."
            disabled={isSubmitting}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary inline-flex w-full items-center justify-center px-5 py-4 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting seller lead..." : "Submit seller lead"}
        </button>
      </div>
    </form>
  );
}
