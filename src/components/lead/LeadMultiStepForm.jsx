import { useMemo, useState } from "react";
import { LeadSubmissionState } from "./LeadSubmissionState";
import {
  buildLeadWhatsAppUrl,
  buildLeadPayload,
  prepareGoogleSheetsPayload,
} from "../../utils/lead";
import { submitLeadToSheet } from "../../utils/leadApi";

const stepLabels = ["Intent", "Requirement", "Contact"];

const buyRentBudgetOptions = [
  "Under Rs 1 Cr",
  "Rs 1 Cr - Rs 3 Cr",
  "Rs 3 Cr - Rs 7 Cr",
  "Rs 7 Cr+",
  "Under Rs 1 L / month",
  "Rs 1 L - Rs 3 L / month",
  "Rs 3 L+ / month",
];

const propertyTypeOptions = ["Apartment", "Builder Floor", "Villa", "Plot", "Luxury Residence", "Commercial"];

const defaultValues = {
  intent: "",
  preferredLocality: "",
  budgetRange: "",
  propertyType: "",
  sellLocality: "",
  expectedPrice: "",
  name: "",
  phone: "",
  notes: "",
};

function validatePhone(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits.length >= 10;
}

export function LeadMultiStepForm({
  sourcePage,
  city,
  businessName,
  whatsappNumber,
  prefilledPropertyTitle = "",
  onLeadReady,
}) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSellFlow = values.intent === "sell";

  const progressWidth = `${(step / stepLabels.length) * 100}%`;

  const budgetOptions = useMemo(() => {
    if (values.intent === "rent") {
      return buyRentBudgetOptions.slice(4);
    }

    return buyRentBudgetOptions.slice(0, 4);
  }, [values.intent]);

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setStep(1);
    setSubmissionResult(null);
    onLeadReady?.(null);
  }

  function updateValue(key, value) {
    setValues((current) => {
      if (key === "intent") {
        return {
          ...current,
          intent: value,
          preferredLocality: "",
          budgetRange: "",
          propertyType: "",
          sellLocality: "",
          expectedPrice: "",
        };
      }

      return {
        ...current,
        [key]: value,
      };
    });

    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validateCurrentStep() {
    const nextErrors = {};

    if (step === 1 && !values.intent) {
      nextErrors.intent = "Please choose whether this is for buying, renting, or selling.";
    }

    if (step === 2) {
      if (isSellFlow) {
        if (!values.sellLocality.trim()) {
          nextErrors.sellLocality = "Enter the property locality.";
        }
        if (!values.propertyType) {
          nextErrors.propertyType = "Choose the property type.";
        }
        if (!values.expectedPrice.trim()) {
          nextErrors.expectedPrice = "Enter the expected price.";
        }
      } else {
        if (!values.preferredLocality.trim()) {
          nextErrors.preferredLocality = "Enter the preferred locality.";
        }
        if (!values.budgetRange) {
          nextErrors.budgetRange = "Select a budget range.";
        }
        if (!values.propertyType) {
          nextErrors.propertyType = "Choose the property type.";
        }
      }
    }

    if (step === 3) {
      if (!values.name.trim()) {
        nextErrors.name = "Enter your name.";
      }
      if (!validatePhone(values.phone)) {
        nextErrors.phone = "Enter a valid phone number.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateCurrentStep()) {
      return;
    }

    setStep((current) => Math.min(current + 1, stepLabels.length));
  }

  function handleBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || !validateCurrentStep()) {
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
          prefilledPropertyTitle,
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
            prefilledPropertyTitle,
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
          message="Your lead has been recorded in the system. Continue to WhatsApp to move the conversation forward immediately."
          payload={submissionResult.payload}
          actionLabel="Continue to WhatsApp"
          actionHref={submissionResult.whatsappUrl}
          secondaryLabel="Submit another lead"
          onSecondaryAction={resetForm}
        />
      );
    }

    return (
      <LeadSubmissionState
        status="error"
        title="Could not save lead to system"
        message="The lead was not saved to Google Sheets. You can still continue to WhatsApp so the conversation is not blocked."
        payload={submissionResult.payload}
        actionLabel="Continue to WhatsApp anyway"
        actionHref={submissionResult.whatsappUrl}
        actionVariant="secondary"
        secondaryLabel="Submit another lead"
        onSecondaryAction={resetForm}
        errorMessage={submissionResult.sheetSubmission.error}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="premium-card rounded-[32px] p-6 sm:p-8 lg:p-9">
      <div className="space-y-10">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
              Premium lead form
            </span>
            <span className="text-sm text-[var(--color-text-soft)]">
              Step {step} of {stepLabels.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
            <div
              className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {stepLabels.map((label, index) => (
              <div
                key={label}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                  index + 1 === step
                    ? "btn-primary text-[var(--color-button-text)]"
                    : "bg-[var(--color-surface-muted)] text-[var(--color-text-soft)]"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
          <p className="text-sm leading-8 text-[var(--color-text-soft)]">{businessName} reviews each enquiry personally before sharing options or scheduling the next step.</p>
        </div>

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "buy", label: "Buy", description: "For premium homebuyers and investors" },
              { value: "rent", label: "Rent", description: "For rentals and relocation-driven requirements" },
              { value: "sell", label: "Sell", description: "For owners planning a qualified sale" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateValue("intent", option.value)}
                disabled={isSubmitting}
                className={`rounded-[24px] border p-5 text-left transition duration-300 hover:-translate-y-0.5 ${
                  values.intent === option.value
                    ? "border-[rgba(183,121,43,0.35)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <p className="text-lg font-semibold text-[var(--color-text)]">{option.label}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{option.description}</p>
              </button>
            ))}
            <div className="sm:col-span-3">{renderFieldError("intent")}</div>
          </div>
        ) : null}

        {step === 2 && !isSellFlow ? (
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text)]">Preferred locality</span>
                <input
                  value={values.preferredLocality}
                  onChange={(event) => updateValue("preferredLocality", event.target.value)}
                  className="form-control"
                  placeholder="Golf Course Road, Worli, Kalyani Nagar..."
                  disabled={isSubmitting}
                />
              {renderFieldError("preferredLocality")}
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)]">Budget range</span>
                <select
                  value={values.budgetRange}
                  onChange={(event) => updateValue("budgetRange", event.target.value)}
                  className="form-select"
                  disabled={isSubmitting}
                >
                  <option value="">Select budget</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {renderFieldError("budgetRange")}
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
            </div>
          </div>
        ) : null}

        {step === 2 && isSellFlow ? (
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text)]">Property locality</span>
                <input
                  value={values.sellLocality}
                  onChange={(event) => updateValue("sellLocality", event.target.value)}
                  className="form-control"
                  placeholder="Enter the property locality"
                  disabled={isSubmitting}
                />
              {renderFieldError("sellLocality")}
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
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
                <span className="text-sm font-semibold text-[var(--color-text)]">Expected price</span>
                <input
                  value={values.expectedPrice}
                  onChange={(event) => updateValue("expectedPrice", event.target.value)}
                  className="form-control"
                  placeholder="Rs 4.5 Cr, Rs 2.2 L / month..."
                  disabled={isSubmitting}
                />
                {renderFieldError("expectedPrice")}
              </label>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)]">Name</span>
                <input
                  value={values.name}
                  onChange={(event) => updateValue("name", event.target.value)}
                  className="form-control"
                  autoComplete="name"
                  placeholder="Enter your name"
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
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text)]">Notes (optional)</span>
              <textarea
                value={values.notes}
                onChange={(event) => updateValue("notes", event.target.value)}
                className="form-textarea"
                placeholder="Tell us any preferences, timeline, or context..."
                disabled={isSubmitting}
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-3.5 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className="btn-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {step < stepLabels.length ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting lead..." : "Submit lead"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
