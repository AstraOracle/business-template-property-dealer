import { PropertyGrid } from "../PropertyGrid";
import { SectionHeading } from "../SectionHeading";

export function SimilarPropertiesSection({ properties }) {
  if (!properties.length) {
    return null;
  }

  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Similar properties"
        title="Other listings your client may want to compare."
        description="Use this section to keep the user engaged and deepen inventory exploration."
      />
      <PropertyGrid properties={properties} />
    </section>
  );
}
