import { test, expect } from "@playwright/test";
import { url } from "inspector";

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

  test("Search and verify new url", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com/");

    // Click on search icon
    await page.getByLabel("Search").click();

    //Select search field and fill

    const searchInput = page.getByPlaceholder("what are you looking for?");

    await searchInput.fill("India");

    // Click search
    await searchInput.press("Enter");

    // Assert URL to contain search?q=india
    expect(page.url()).toContain("search?q=India");
  });
});
