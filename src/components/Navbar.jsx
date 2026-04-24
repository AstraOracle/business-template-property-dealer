import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navigationLinks } from "../config/navigation";
import { siteConfig } from "../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../utils/contact";
import { createLogoPlaceholder, getImageSrc, isImageUrl } from "../utils/media";

function navLinkClass({ isActive }) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "btn-primary text-[var(--color-button-text)]"
      : "text-[var(--color-text-soft)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
  ].join(" ");
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Navbar",
    notes: "I want to connect with your team for a premium property consultation.",
  });
  const logoSrc = getImageSrc(
    siteConfig.logoUrl,
    createLogoPlaceholder({
      businessName: siteConfig.businessName,
      brandInitials: siteConfig.brandInitials,
    }),
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(251,248,243,0.88)] backdrop-blur-xl">
      <div className="shell-container flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-3 md:flex-none" onClick={() => setIsOpen(false)}>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border)] ${isImageUrl(siteConfig.logoUrl) ? "bg-white" : "bg-[var(--color-primary)]"}`}>
            <img src={logoSrc} alt={siteConfig.businessName} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.16em] text-[var(--color-text)] uppercase">
              {siteConfig.businessName}
            </p>
            <p className="truncate text-xs text-[var(--color-text-soft)]">
              Premium property advisory in {siteConfig.city}
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex shrink-0 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navigationLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary hidden px-5 py-3 text-sm font-semibold transition md:inline-flex"
        >
          {siteConfig.primaryCTA}
        </a>
      </div>

      {isOpen ? (
        <div className="shell-container pb-4 md:hidden">
          <div className="glass-panel rounded-[28px] border border-[var(--color-border)] p-3">
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navLinkClass}
                  end={link.to === "/"}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-2 inline-flex justify-center px-5 py-3 text-sm font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {siteConfig.primaryCTA}
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
