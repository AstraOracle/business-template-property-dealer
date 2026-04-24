import { PropertyListingsSection } from "../components/PropertyListingsSection";
import { SectionHeading } from "../components/SectionHeading";
import { properties } from "../data/properties";

export function BuyPropertiesPage() {
  return (
    <section className="shell-container page-shell space-y-12 sm:space-y-14">
      <div className="rounded-[38px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(242,235,225,0.88))] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.06)] sm:p-8 lg:p-10">
        <SectionHeading
          eyebrow="Buy"
          title="Premium homes presented with more calm, confidence, and decision-ready detail."
          description="The buying experience should feel focused, not noisy. This listing layout is designed to help serious buyers scan, compare, and enquire without the clutter of a generic property portal."
        />
      </div>
      <PropertyListingsSection properties={properties} defaultPurpose="buy" />
    </section>
  );
}
