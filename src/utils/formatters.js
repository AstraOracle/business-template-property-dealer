export function toTitleCase(value = "") {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatPropertyArea(property) {
  return `${property.area} ${property.areaUnit}`;
}

export function formatBedBathLabel(property) {
  return `${property.bedrooms} Bed | ${property.bathrooms} Bath`;
}
