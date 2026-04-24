import { useMemo, useState } from "react";

export function AdminPasswordGate({ hasConfiguredPassword, helperText, isLoading, onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resolvedHelperText = useMemo(() => {
    if (!hasConfiguredPassword) {
      return "No active password is available yet. Check the admin settings source and try again.";
    }

    return helperText || "Enter the current admin password to open the hidden content editor.";
  }, [hasConfiguredPassword, helperText]);

  function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (!hasConfiguredPassword) {
      setError("Admin password settings are not ready yet.");
      return;
    }

    const success = onUnlock(password);

    if (!success) {
      setError("Incorrect password. Please try again.");
      return;
    }

    setError("");
    setPassword("");
  }

  return (
    <section className="shell-container py-10 sm:py-14">
      <div className="mx-auto max-w-xl premium-card rounded-[36px] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">Admin Lite</p>
        <h1 className="section-title mt-4 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
          Hidden content editor
        </h1>
        <p className="mt-4 text-sm leading-8 text-[var(--color-text-soft)]">
          {resolvedHelperText}
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[var(--color-text)]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              placeholder="Enter admin password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </label>

          {error ? (
            <p className="rounded-[18px] bg-[rgba(142,58,34,0.08)] px-4 py-3 text-sm text-[#8e3a22]">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-[var(--color-button-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Checking admin settings..." : "Open editor"}
          </button>
        </form>
      </div>
    </section>
  );
}
