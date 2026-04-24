export const budgetRangeOptions = [
  { value: "all", label: "Any budget", min: 0, max: Number.POSITIVE_INFINITY },
  { value: "under-1cr", label: "Under Rs 1 Cr", min: 0, max: 10000000 },
  { value: "1cr-5cr", label: "Rs 1 Cr - Rs 5 Cr", min: 10000000, max: 50000000 },
  { value: "5cr-10cr", label: "Rs 5 Cr - Rs 10 Cr", min: 50000000, max: 100000000 },
  { value: "10cr-plus", label: "Rs 10 Cr+", min: 100000000, max: Number.POSITIVE_INFINITY },
  { value: "under-1lpm", label: "Under Rs 1 L / month", min: 0, max: 100000 },
  { value: "1lpm-3lpm", label: "Rs 1 L - Rs 3 L / month", min: 100000, max: 300000 },
  { value: "3lpm-plus", label: "Rs 3 L+ / month", min: 300000, max: Number.POSITIVE_INFINITY },
];

export function getBudgetOptionsForPurpose(purpose) {
  if (purpose === "rent") {
    return budgetRangeOptions.filter((option) =>
      ["all", "under-1lpm", "1lpm-3lpm", "3lpm-plus"].includes(option.value),
    );
  }

  return budgetRangeOptions.filter((option) =>
    ["all", "under-1cr", "1cr-5cr", "5cr-10cr", "10cr-plus"].includes(option.value),
  );
}

export function getPropertyFilterOptions(properties) {
  const localities = [...new Set(properties.map((property) => property.locality))].sort();
  const propertyTypes = [...new Set(properties.map((property) => property.propertyType))].sort();
  const purposes = [...new Set(properties.map((property) => property.purpose))].sort();

  return {
    purposes,
    localities,
    propertyTypes,
  };
}

export function applyPropertyFilters(properties, filters) {
  const selectedBudget = budgetRangeOptions.find((option) => option.value === filters.budgetRange);

  return properties.filter((property) => {
    const matchesPurpose = filters.purpose === "all" || property.purpose === filters.purpose;
    const matchesLocality = filters.locality === "all" || property.locality === filters.locality;
    const matchesPropertyType =
      filters.propertyType === "all" || property.propertyType === filters.propertyType;
    const matchesBudget =
      !selectedBudget ||
      filters.budgetRange === "all" ||
      (property.price >= selectedBudget.min && property.price <= selectedBudget.max);

    return matchesPurpose && matchesLocality && matchesPropertyType && matchesBudget;
  });
}
