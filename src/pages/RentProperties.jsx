import { PropertyListingsSection } from "../components/PropertyListingsSection";
import { SectionHeading } from "../components/SectionHeading";
import { properties } from "../data/properties";

export function RentPropertiesPage() {
  return (
    <section className="shell-container page-shell space-y-12 sm:space-y-14">
      <div className="rounded-[38px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(255,253,249,0.96),rgba(242,235,225,0.88))] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.06)] sm:p-8 lg:p-10">
        <SectionHeading
          eyebrow="Rent"
          title="Rental inventory with a more polished, relocation-friendly presentation."
          description="This route is structured to feel like a premium leasing funnel: fewer distractions, cleaner filters, and a clearer path from shortlist to enquiry."
        />
      </div>
      <PropertyListingsSection properties={properties} defaultPurpose="rent" />
    </section>
  );
}
