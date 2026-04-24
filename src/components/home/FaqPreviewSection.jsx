import { Link } from "react-router-dom";
import { SectionHeading } from "../SectionHeading";

export function FaqPreviewSection({ faqs }) {
  return (
    <section className="shell-container space-y-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="FAQ preview"
          title="Answer the most common buyer and seller questions before they ask."
          description="Clear FAQ framing improves trust, reduces friction, and makes the homepage feel complete."
        />
        <Link
          to="/contact"
          className="inline-flex h-fit items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] shadow-[0_16px_30px_rgba(20,26,41,0.06)] transition duration-300 hover:-translate-y-0.5"
        >
          Ask a custom question
        </Link>
      </div>
      <div className="grid gap-4">
        {faqs.slice(0, 3).map((faq) => (
          <article key={faq.id} className="premium-card rounded-[24px] p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text)]">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
