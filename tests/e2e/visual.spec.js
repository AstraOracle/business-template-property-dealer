import { expect, test } from "@playwright/test";
import { mockAppsScript } from "./support/mockAppsScript";

test.beforeEach(async ({ page }) => {
  await mockAppsScript(page);
});

test("homepage hero visual stays stable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toContainText("Premium property advisory");
  await expect(page.locator("main section").first().locator(".min-w-0")).toHaveScreenshot("home-hero-copy.png", {
    fullPage: false,
    animations: "disabled",
  });
});

test("contact flow visual stays stable", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("main")).toContainText("Share your requirement in a format built for follow-through.");
  await expect(page.locator("main")).toHaveScreenshot("contact-main.png", {
    fullPage: false,
    animations: "disabled",
    maxDiffPixels: 1200,
  });
});

test("admin password gate visual stays stable", async ({ page }) => {
  await page.goto("/admin-a7f9k2x");
  await expect(page.locator("main")).toContainText("Hidden content editor");
  await expect(page.locator("main")).toHaveScreenshot("admin-gate-main.png", {
    fullPage: false,
    animations: "disabled",
  });
});
