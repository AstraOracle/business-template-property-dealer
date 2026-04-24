import { siteConfig } from "../../config/siteConfig";

export function AboutStorySection() {
  return (
    <section className="site-section grid gap-8 rounded-[36px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(242,235,225,0.92))] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-6">
        <div className="premium-card rounded-[30px] bg-[linear-gradient(135deg,#eadcc5,#f7efe4)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Founder story</p>
          <h2 className="section-title mt-5 text-3xl font-semibold text-[var(--color-text)]">
            {siteConfig.founderName}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">{siteConfig.founderTitle}</p>
          <p className="mt-5 text-sm leading-8 text-[var(--color-text-soft)]">
            The agency was shaped to make premium property journeys feel more informed, more composed, and much less transactional.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {siteConfig.agencyStats.map((item) => (
            <div key={item.label} className="premium-card rounded-[24px] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">{item.label}</p>
              <p className="mt-3 text-base font-semibold text-[var(--color-text)]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Agency story</p>
        <h1 className="section-title text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
          A premium advisory practice built around clarity, trust, and better decisions.
        </h1>
        <div className="space-y-4 text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
          {siteConfig.founderStory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
