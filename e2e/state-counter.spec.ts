import { test, expect } from "@playwright/test";

test("/state Update button value", async ({ page }) => {
  await page.goto("/state");
  await page.getByRole("button", { name: "Count: 0" }).click();
  await expect(page.getByRole("button", { name: "Count: 1" })).toBeVisible();
});
