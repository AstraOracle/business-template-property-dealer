import { expect, test } from "@playwright/test";
import { mockAppsScript } from "./support/mockAppsScript";

test.beforeEach(async ({ page }) => {
  await mockAppsScript(page);
});

test("critical public routes load", async ({ page }) => {
  const routes = [
    { path: "/", text: "Premium property advisory" },
    { path: "/buy", text: "Premium homes presented" },
    { path: "/rent", text: "Rental inventory with a more polished" },
    { path: "/contact", text: "Share your requirement in a format built for follow-through." },
  ];

  for (const route of routes) {
    await page.goto(route.path);
    await expect(page.locator("body")).toContainText(route.text);
  }
});

test("contact lead form completes the qualification flow", async ({ page }) => {
  await page.goto("/contact");

  await page.getByRole("button", { name: "Buy" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: "Apartment" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Preferred location").fill("Golf Course Road");
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: "Rs 7 Cr+" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByRole("button", { name: "Within 30 days" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await page.getByLabel("Name").fill("Ritika Sethi");
  await page.getByLabel("Phone").fill("+91 98765 43210");
  await page.getByRole("button", { name: "Submit lead" }).click();

  await expect(page.locator("body")).toContainText("Lead saved successfully");
  await expect(page.getByRole("link", { name: "Continue to WhatsApp" })).toBeVisible();
});

test("admin login loads the protected dashboard and lead inbox", async ({ page }) => {
  await page.goto("/admin-a7f9k2x");

  await page.getByLabel("Password").fill("test-admin-123");
  await page.getByRole("button", { name: "Open editor" }).click();

  await expect(page.locator("body")).toContainText("Business details and homepage copy");

  await page.getByRole("button", { name: "Lead Inbox" }).click();
  await expect(page.locator("body")).toContainText("A lightweight inbox for high-intent enquiries");
  await expect(page.locator("body")).toContainText("Ritika Sethi");
  await expect(page.locator("body")).toContainText("HOT");
});

test("seller lead form submits successfully", async ({ page }) => {
  await page.goto("/sell");

  await page.getByLabel("Owner name").fill("Amit Khanna");
  await page.getByLabel("Phone").fill("+91 99887 76655");
  await page.getByLabel("Property type").selectOption("Builder Floor");
  await page.getByLabel("Locality").fill("DLF Phase 5");
  await page.getByLabel("Expected price").fill("Rs 4.5 Cr");
  await page.getByLabel("Timeline to sell").selectOption("Within 60 days");
  await page.getByRole("button", { name: "Submit seller lead" }).click();

  await expect(page.locator("body")).toContainText("Lead saved successfully");
  await expect(page.getByRole("link", { name: "Continue to WhatsApp" })).toBeVisible();
});
