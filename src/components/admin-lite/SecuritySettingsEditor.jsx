import { useState } from "react";

export function SecuritySettingsEditor({ onSubmit, isSaving }) {
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function updateField(key, value) {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await onSubmit(formValues);

    if (result?.ok) {
      setFormValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }

  return (
    <form className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" onSubmit={handleSubmit}>
      <div className="space-y-5 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--color-text)]">Password settings</p>
          <p className="text-sm leading-7 text-[var(--color-text-soft)]">
            Keep this simple for the dealer. Use the current password once, then set a new password that is easy to remember but not too short.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">Current password</span>
          <input
            type="password"
            value={formValues.currentPassword}
            onChange={(event) => updateField("currentPassword", event.target.value)}
            className="form-control"
            autoComplete="current-password"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">New password</span>
          <input
            type="password"
            value={formValues.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
            className="form-control"
            autoComplete="new-password"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[var(--color-text)]">Confirm new password</span>
          <input
            type="password"
            value={formValues.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
            className="form-control"
            autoComplete="new-password"
          />
        </label>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Updating..." : "Update password"}
        </button>
      </div>

      <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <p className="text-sm font-semibold text-[var(--color-text)]">Helpful guidance</p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-soft)]">
          <li>Use at least 8 characters so the password is harder to guess.</li>
          <li>Only one current password is active at a time across reloads.</li>
          <li>After saving, use the new password the next time you open the hidden admin.</li>
        </ul>
      </div>
    </form>
  );
}
