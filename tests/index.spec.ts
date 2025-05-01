import { test, expect } from "@playwright/test";

test("/", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot();
});
