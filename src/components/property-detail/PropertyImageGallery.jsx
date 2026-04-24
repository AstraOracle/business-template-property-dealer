import { createPropertyPlaceholder, getMediaSurfaceStyle } from "../../utils/media";

export function PropertyImageGallery({ property }) {
  const galleryImages = Array.isArray(property.galleryImages) ? property.galleryImages : [];

  return (
    <section className="space-y-4">
      <div className="premium-card overflow-hidden rounded-[34px]">
        <div className="relative h-[360px] sm:h-[480px]" style={getMediaSurfaceStyle(property.featuredImage, createPropertyPlaceholder(property))}>
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(29,36,51,0.28))] p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Gallery preview</p>
            <p className="mt-2 text-sm text-white/90">A more immersive visual surface for premium property presentation.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {galleryImages.map((image, index) => (
          <div
            key={`${property.id}-${index}`}
            className="premium-card h-32 rounded-[24px] sm:h-36"
            style={getMediaSurfaceStyle(image, createPropertyPlaceholder({
              ...property,
              title: `${property.title} ${index + 1}`,
            }))}
          />
        ))}
      </div>
    </section>
  );
}
