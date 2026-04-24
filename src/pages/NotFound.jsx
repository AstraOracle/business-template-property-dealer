import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="shell-container py-14">
      <div className="premium-card rounded-[32px] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">404</p>
        <h1 className="section-title mt-4 text-4xl font-semibold text-[var(--color-text)]">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-text-soft)]">
          The page you are looking for is no longer available or may have moved. Use the navigation to continue browsing the site.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-button-text)]"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
