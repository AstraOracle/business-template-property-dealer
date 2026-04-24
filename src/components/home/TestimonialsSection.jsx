import { SectionHeading } from "../SectionHeading";
import { createAvatarPlaceholder, getMediaSurfaceStyle } from "../../utils/media";

export function TestimonialsSection({ testimonials }) {
  return (
    <section className="shell-container site-section space-y-10">
      <SectionHeading
        eyebrow="Client trust"
        title="Client feedback that feels grounded in real service, not generic praise."
        description="A premium brand feels credible when the proof is specific, local, and understated. This section is designed to support that."
      />
      <div className="grid gap-8 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="premium-card rounded-[32px] p-6 sm:p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(20,26,41,0.08)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-14 shrink-0 rounded-full border border-[var(--color-border)]"
                  style={getMediaSurfaceStyle(
                    testimonial.avatarImage,
                    createAvatarPlaceholder({ name: testimonial.name, role: testimonial.role }),
                  )}
                />
                <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">
                  {testimonial.role}
                </span>
              </div>
              <span className="section-title text-4xl leading-none text-[rgba(183,121,43,0.35)]">"</span>
            </div>
            <p className="mt-6 text-[15px] leading-8 text-[var(--color-text-soft)]">{testimonial.quote}</p>
            <div className="mt-7 border-t border-[var(--color-border)] pt-5">
              <p className="font-semibold text-[var(--color-text)]">{testimonial.name}</p>
              <p className="text-sm text-[var(--color-text-soft)]">{testimonial.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
