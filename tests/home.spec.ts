import { test, expect } from "@playwright/test";
import { url } from "inspector";

test.describe("Homepage", () => {
  test("Open page and verify url", async ({ page }) => {
    // Go to homepage
    await page.goto(
      "https://www.icc-cricket.com/tournaments/womens-t20-worldcup"
    );

    // Expect url to include 'cricket'
    await expect(page).toHaveURL(/.*cricket/);
  });

  test("Assert logo is visible", async ({ page }) => {
    // Go to homepage
    await page.goto(
      "https://www.icc-cricket.com/tournaments/womens-t20-worldcup"
    );

    // Assert logo is visible

    const logo = page.getByAltText("womens-t20-wc-2024-logo").first();
    await expect(logo).toBeVisible();
  });

  test("Search and verify new url", async ({ page }) => {
    // Go to homepage
    await page.goto(
      "https://www.icc-cricket.com/tournaments/womens-t20-worldcup"
    );

    // Click on search icon
    await page.getByLabel("Search").first().click();

    //Select search field and fill

    const searchInput = page.getByPlaceholder("what are you looking for?");

    await searchInput.fill("India");

    // Click search
    await searchInput.press("Enter");

    // Assert URL to contain search?q=india
    expect(page.url()).toContain("search?q=India");
  });

  test.only("Verify menu tabs text and link", async ({ page }) => {
    // Go to homepage
    console.log("************** TEST ******************");

    await page.goto(
      "https://www.icc-cricket.com/tournaments/womens-t20-worldcup"
    );

    // Check that the text matches the menu tabs
    const expectedMenuText = [
      "icc home",
      "matches",
      "standings",
      "stats",
      "teams",
      "news",
      "videos",
      "predictor",
      "ticketing",
      "more",
    ];

    const actualMenuText = await page
      .locator("[id^='primaryNavigation_'] .menu-view .menu-list-wrapper > div")
      .allInnerTexts();

    const normalizeArray = (arr) =>
      arr.map((item) => item.trim().toLowerCase());

    const normalizedActualMenuText = normalizeArray(actualMenuText);
    const normalizedExpectedMenuText = normalizeArray(expectedMenuText);

    expect(await normalizedActualMenuText).toEqual(normalizedExpectedMenuText);
  });
});
