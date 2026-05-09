import { defineConfig, devices } from "@playwright/test";

const extraHTTPHeaders = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  ? {
      "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      "x-vercel-set-bypass-cookie": "true",
    }
  : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "https://replace-with-your-staging-url.vercel.app",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    extraHTTPHeaders,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
