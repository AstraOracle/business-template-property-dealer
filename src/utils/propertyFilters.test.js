import { applyPropertyFilters, getBudgetOptionsForPurpose, getPropertyFilterOptions } from "./propertyFilters";

const sampleProperties = [
  {
    title: "Camellias Signature Residence",
    purpose: "buy",
    locality: "Golf Course Road",
    propertyType: "Apartment",
    price: 170000000,
  },
  {
    title: "Corporate Lease Suite",
    purpose: "rent",
    locality: "DLF Phase 5",
    propertyType: "Apartment",
    price: 180000,
  },
  {
    title: "Builder Floor Investment",
    purpose: "buy",
    locality: "Sushant Lok",
    propertyType: "Builder Floor",
    price: 45000000,
  },
];

describe("getBudgetOptionsForPurpose", () => {
  it("returns rental budget ranges for rent", () => {
    const options = getBudgetOptionsForPurpose("rent");

    expect(options.map((option) => option.value)).toEqual(["all", "under-1lpm", "1lpm-3lpm", "3lpm-plus"]);
  });
});

describe("getPropertyFilterOptions", () => {
  it("builds sorted filter options from properties", () => {
    expect(getPropertyFilterOptions(sampleProperties)).toEqual({
      purposes: ["buy", "rent"],
      localities: ["DLF Phase 5", "Golf Course Road", "Sushant Lok"],
      propertyTypes: ["Apartment", "Builder Floor"],
    });
  });
});

describe("applyPropertyFilters", () => {
  it("filters by purpose, locality, property type, and budget", () => {
    const results = applyPropertyFilters(sampleProperties, {
      purpose: "buy",
      locality: "Sushant Lok",
      propertyType: "Builder Floor",
      budgetRange: "1cr-5cr",
    });

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Builder Floor Investment");
  });

  it("returns all properties when filters are wide open", () => {
    const results = applyPropertyFilters(sampleProperties, {
      purpose: "all",
      locality: "all",
      propertyType: "all",
      budgetRange: "all",
    });

    expect(results).toHaveLength(sampleProperties.length);
  });
});
