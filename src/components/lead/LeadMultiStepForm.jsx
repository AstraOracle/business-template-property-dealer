import { useMemo, useState } from "react";
import { LeadSubmissionState } from "./LeadSubmissionState";
import {
  buildDealerAlertWhatsAppUrl,
  buildLeadWhatsAppUrl,
  buildLeadPayload,
  prepareGoogleSheetsPayload,
} from "../../utils/lead";
import { submitLeadToSheet } from "../../utils/leadApi";

const stepDefinitions = [
  { id: "intent", label: "Intent" },
  { id: "propertyType", label: "Property Type" },
  { id: "location", label: "Location" },
  { id: "budget", label: "Budget" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

const buyBudgetOptions = [
  "Under Rs 1 Cr",
  "Rs 1 Cr - Rs 3 Cr",
  "Rs 3 Cr - Rs 7 Cr",
  "Rs 7 Cr+",
];

const rentBudgetOptions = [
  "Under Rs 1 L / month",
  "Rs 1 L - Rs 3 L / month",
  "Rs 3 L+ / month",
];

const propertyTypeOptions = ["Apartment", "Builder Floor", "Villa", "Plot", "Luxury Residence", "Commercial"];
const timelineOptions = ["Immediate", "Within 30 days", "Within 60 days", "Within 90 days", "Just exploring"];

const defaultValues = {
  intent: "",
  propertyType: "",
  preferredLocality: "",
  sellLocality: "",
  budgetRange: "",
  expectedPrice: "",
  timeline: "",
  name: "",
  phone: "",
  notes: "",
};

function validatePhone(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits.length >= 10;
}

function getLocationValue(values) {
  return values.intent === "sell" ? values.sellLocality : values.preferredLocality;
}

function getBudgetValue(values) {
  return values.intent === "sell" ? values.expectedPrice : values.budgetRange;
}

function getStepNumber(stepId) {
  return stepDefinitions.findIndex((step) => step.id === stepId) + 1;
}

function StepChoiceCard({ isActive, label, description, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[24px] border p-5 text-left transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${
        isActive
          ? "border-[rgba(183,121,43,0.35)] bg-[var(--color-accent-soft)]"
          : "border-[var(--color-border)] bg-white"
      }`}
    >
      <p className="text-lg font-semibold text-[var(--color-text)]">{label}</p>
      {description ? <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{description}</p> : null}
    </button>
  );
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

  const activeStep = stepDefinitions[step - 1];
  const progressWidth = `${(step / stepDefinitions.length) * 100}%`;
  const isSellFlow = values.intent === "sell";
  const budgetOptions = values.intent === "rent" ? rentBudgetOptions : buyBudgetOptions;

  const requirementSummary = useMemo(() => {
    const summaryParts = [
      values.propertyType,
      getLocationValue(values),
      getBudgetValue(values),
      values.timeline,
    ].filter(Boolean);

    return summaryParts.join(" | ");
  }, [values]);

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
          ...defaultValues,
          intent: value,
          notes: current.notes,
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

    if (step === getStepNumber("intent") && !values.intent) {
      nextErrors.intent = "Choose whether this is for buying, renting, or selling.";
    }

    if (step === getStepNumber("propertyType") && !values.propertyType) {
      nextErrors.propertyType = "Choose the property type.";
    }

    if (step === getStepNumber("location") && !getLocationValue(values).trim()) {
      nextErrors.location = "Enter the location you have in mind.";
    }

    if (step === getStepNumber("budget") && !getBudgetValue(values).trim()) {
      nextErrors.budget = "Enter the expected budget.";
    }

    if (step === getStepNumber("timeline") && !values.timeline) {
      nextErrors.timeline = "Choose the expected timeline.";
    }

    if (step === getStepNumber("contact")) {
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

    setStep((current) => Math.min(current + 1, stepDefinitions.length));
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
      const dealerAlertUrl = buildDealerAlertWhatsAppUrl(whatsappNumber, payload);
      const googleSheetsPayload = prepareGoogleSheetsPayload(payload);
      const sheetSubmission = await submitLeadToSheet(googleSheetsPayload);

      const finalResult = {
        status: sheetSubmission.ok ? "success" : "error",
        payload,
        googleSheetsPayload,
        whatsappUrl,
        dealerAlertUrl,
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
        dealerAlertUrl: buildDealerAlertWhatsAppUrl(whatsappNumber, fallbackPayload),
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
          dealerAlertLabel="Dealer alert link"
          dealerAlertHref={submissionResult.dealerAlertUrl}
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
      <div className="space-y-8">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
              Premium lead form
            </span>
            <span className="text-sm text-[var(--color-text-soft)]">
              Step {step} of {stepDefinitions.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
            <div
              className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {stepDefinitions.map((item, index) => (
              <div
                key={item.id}
                className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  index + 1 === step
                    ? "btn-primary text-[var(--color-button-text)]"
                    : index + 1 < step
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]"
                      : "bg-[var(--color-surface-muted)] text-[var(--color-text-soft)]"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="section-title text-3xl font-semibold text-[var(--color-text)]">
              {activeStep.id === "intent" ? "Tell us what you need." : ""}
              {activeStep.id === "propertyType" ? "Which property type fits best?" : ""}
              {activeStep.id === "location" ? "Which location should we focus on?" : ""}
              {activeStep.id === "budget" ? "What budget should we work with?" : ""}
              {activeStep.id === "timeline" ? "When are you planning to move?" : ""}
              {activeStep.id === "contact" ? "Where should we reach you?" : ""}
            </h3>
            <p className="text-sm leading-8 text-[var(--color-text-soft)]">
              {activeStep.id === "intent" ? `${businessName} uses this quick flow to qualify serious enquiries faster.` : ""}
              {activeStep.id === "propertyType" ? "Choose the format first so the team can narrow the right inventory." : ""}
              {activeStep.id === "location" ? "A clear micro-market helps us send more relevant options first." : ""}
              {activeStep.id === "budget" ? "A realistic budget helps filter out mismatched inventory early." : ""}
              {activeStep.id === "timeline" ? "A clear timeline helps prioritize the right next step." : ""}
              {activeStep.id === "contact" ? "Just your name and number, and the team can pick this up properly." : ""}
            </p>
          </div>
        </div>

        {step > 1 ? (
          <div className="rounded-[24px] bg-[var(--color-surface-muted)] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">
            <span className="font-semibold text-[var(--color-text)]">Current brief:</span>{" "}
            {requirementSummary || "Start by choosing the enquiry intent."}
          </div>
        ) : null}

        {step === getStepNumber("intent") ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "buy", label: "Buy", description: "For homebuyers and investors" },
              { value: "rent", label: "Rent", description: "For rentals and relocation needs" },
              { value: "sell", label: "Sell", description: "For owners planning a sale" },
            ].map((option) => (
              <StepChoiceCard
                key={option.value}
                isActive={values.intent === option.value}
                label={option.label}
                description={option.description}
                onClick={() => updateValue("intent", option.value)}
                disabled={isSubmitting}
              />
            ))}
            <div className="sm:col-span-3">{renderFieldError("intent")}</div>
          </div>
        ) : null}

        {step === getStepNumber("propertyType") ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {propertyTypeOptions.map((option) => (
              <StepChoiceCard
                key={option}
                isActive={values.propertyType === option}
                label={option}
                onClick={() => updateValue("propertyType", option)}
                disabled={isSubmitting}
              />
            ))}
            <div className="sm:col-span-2">{renderFieldError("propertyType")}</div>
          </div>
        ) : null}

        {step === getStepNumber("location") ? (
          <div className="grid gap-3">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text)]">
                {isSellFlow ? "Property location" : "Preferred location"}
              </span>
              <input
                value={getLocationValue(values)}
                onChange={(event) => updateValue(isSellFlow ? "sellLocality" : "preferredLocality", event.target.value)}
                className="form-control"
                placeholder={isSellFlow ? "Golf Course Road, DLF Phase 5..." : "Golf Course Road, Sohna Road..."}
                disabled={isSubmitting}
              />
            </label>
            {renderFieldError("location")}
          </div>
        ) : null}

        {step === getStepNumber("budget") ? (
          <div className="grid gap-4">
            {isSellFlow ? (
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text)]">Expected price</span>
                <input
                  value={values.expectedPrice}
                  onChange={(event) => updateValue("expectedPrice", event.target.value)}
                  className="form-control"
                  placeholder="Rs 4.5 Cr"
                  disabled={isSubmitting}
                />
              </label>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {budgetOptions.map((option) => (
                  <StepChoiceCard
                    key={option}
                    isActive={values.budgetRange === option}
                    label={option}
                    onClick={() => updateValue("budgetRange", option)}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
            )}
            {renderFieldError("budget")}
          </div>
        ) : null}

        {step === getStepNumber("timeline") ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {timelineOptions.map((option) => (
              <StepChoiceCard
                key={option}
                isActive={values.timeline === option}
                label={option}
                onClick={() => updateValue("timeline", option)}
                disabled={isSubmitting}
              />
            ))}
            <div className="sm:col-span-2">{renderFieldError("timeline")}</div>
          </div>
        ) : null}

        {step === getStepNumber("contact") ? (
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
                placeholder="Share any extra preference if needed..."
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
            className="btn-secondary inline-flex min-h-12 items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {step < stepDefinitions.length ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="btn-primary inline-flex min-h-12 items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex min-h-12 items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting lead..." : "Submit lead"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
