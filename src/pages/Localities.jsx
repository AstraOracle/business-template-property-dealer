import { LocalityGrid } from "../components/LocalityGrid";
import { SectionHeading } from "../components/SectionHeading";
import { localities } from "../data/localities";

export function LocalitiesPage() {
  const featuredLocalities = localities.filter((locality) => locality.featured);
  const standardLocalities = localities.filter((locality) => !locality.featured);

  return (
    <div className="shell-container page-shell space-y-12 sm:space-y-14 lg:space-y-16">
      <section className="grid gap-8 rounded-[38px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(242,235,225,0.9))] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <SectionHeading
            eyebrow="Localities"
            title="A premium locality-led discovery hub designed to position your agency as the local market expert."
            description="Use these pages to educate buyers, strengthen trust, and guide high-intent visitors toward the right micro-market with calmer, more credible storytelling."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="premium-card rounded-[24px] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Featured markets</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--color-text)]">{featuredLocalities.length}</p>
          </div>
          <div className="premium-card rounded-[24px] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Cities covered</p>
            <p className="mt-3 text-3xl font-semibold text-[var(--color-text)]">
              {[...new Set(localities.map((locality) => locality.city))].length}
            </p>
          </div>
          <div className="premium-card rounded-[24px] p-5 sm:p-6 sm:col-span-2 xl:col-span-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Use case</p>
            <p className="mt-3 max-w-xs text-base font-semibold leading-7 text-[var(--color-text)]">Education and lead qualification</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Featured localities"
          title="Priority micro-markets with stronger buyer and investor demand."
          description="Lead with your best-known premium localities to reinforce expertise and channel visitors into deeper market pages."
        />
        <LocalityGrid localities={featuredLocalities} />
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="More localities"
          title="Additional locality pages for broader market coverage."
          description="Use this layer to expand your city-by-city content strategy while keeping the same premium structure."
        />
        <LocalityGrid localities={standardLocalities} />
      </section>
    </div>
  );
}
