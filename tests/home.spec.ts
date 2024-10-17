import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("Open page and verify url", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com/");

    // Expect url to include 'cricket'
    await expect(page).toHaveURL(/.*cricket/);
  });

  test("Assert logo is visible", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com/");

    // Assert logo is visible

    const logo = page
      .getByRole("link", { name: "womens-t20-wc-2024-logo" })
      .first();
    await expect(logo).toBeVisible();
  });
});
