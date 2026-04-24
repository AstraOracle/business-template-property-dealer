import { useMemo, useState } from "react";
import { PropertyFilterBar } from "./PropertyFilterBar";
import { PropertyGrid } from "./PropertyGrid";
import {
  applyPropertyFilters,
  getBudgetOptionsForPurpose,
  getPropertyFilterOptions,
} from "../utils/propertyFilters";

function createInitialFilters(purpose) {
  return {
    purpose,
    locality: "all",
    propertyType: "all",
    budgetRange: "all",
  };
}

export function PropertyListingsSection({ properties, defaultPurpose }) {
  const [filters, setFilters] = useState(() => createInitialFilters(defaultPurpose));

  const filterOptions = useMemo(() => getPropertyFilterOptions(properties), [properties]);
  const effectivePurpose = filters.purpose === "all" ? defaultPurpose : filters.purpose;
  const budgetOptions = useMemo(
    () => getBudgetOptionsForPurpose(effectivePurpose),
    [effectivePurpose],
  );

  const filteredProperties = useMemo(
    () => applyPropertyFilters(properties, filters),
    [properties, filters],
  );

  function handleFilterChange(key, value) {
    setFilters((current) => {
      if (key === "purpose") {
        return {
          ...current,
          purpose: value,
          budgetRange: "all",
        };
      }

      return {
        ...current,
        [key]: value,
      };
    });
  }

  function handleReset() {
    setFilters(createInitialFilters(defaultPurpose));
  }

  const purposeOptions = [
    { value: "all", label: "All" },
    ...filterOptions.purposes.map((purpose) => ({
      value: purpose,
      label: purpose === "buy" ? "Buy" : "Rent",
    })),
  ];

  const localityOptions = [
    { value: "all", label: "All localities" },
    ...filterOptions.localities.map((locality) => ({
      value: locality,
      label: locality,
    })),
  ];

  const propertyTypeOptions = [
    { value: "all", label: "All property types" },
    ...filterOptions.propertyTypes.map((propertyType) => ({
      value: propertyType,
      label: propertyType,
    })),
  ];

  return (
    <div className="space-y-8">
      <PropertyFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        purposeOptions={purposeOptions}
        localityOptions={localityOptions}
        propertyTypeOptions={propertyTypeOptions}
        budgetOptions={budgetOptions}
      />

      <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--color-border)] bg-white/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">
          Showing <span className="font-semibold text-[var(--color-text)]">{filteredProperties.length}</span> listing{filteredProperties.length === 1 ? "" : "s"} with a calmer, more focused filter view.
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">
          Purpose, locality, type, and budget
        </p>
      </div>

      <PropertyGrid properties={filteredProperties} />
    </div>
  );
}
