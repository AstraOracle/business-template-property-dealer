export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignmentClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-5 ${alignmentClass}`}>
      {eyebrow ? (
        <span className="inline-flex w-fit rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-5">
        <h2 className="section-title max-w-4xl text-[2.1rem] font-semibold leading-[1.02] text-[var(--color-text)] sm:text-[2.7rem] lg:text-[3.1rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-[15px] leading-8 text-[var(--color-text-soft)] sm:text-base sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
