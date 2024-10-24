import { test, expect } from "@playwright/test";
import exp from "constants";
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

  test("Verify menu tabs text and link", async ({ page }) => {
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

    const menuItems = page.locator(
      "[id^='primaryNavigation_'] .menu-view .menu-list-wrapper > div"
    );

    const actualMenuText = await page
      .locator("[id^='primaryNavigation_'] .menu-view .menu-list-wrapper > div")
      .allInnerTexts();

    const normalizeArray = (arr) =>
      arr.map((item) => item.trim().toLowerCase());

    const normalizedActualMenuText = normalizeArray(actualMenuText);
    const normalizedExpectedMenuText = normalizeArray(expectedMenuText);

    expect(await normalizedActualMenuText).toEqual(normalizedExpectedMenuText);

    // Check menu links and text match

    const expectedMenuTextLinks = [
      { text: "ICC Home", href: "/index" },
      {
        text: "Matches",
        href: "/tournaments/womens-t20-worldcup/matches",
      },
      {
        text: "Standings",
        href: "/tournaments/womens-t20-worldcup/standings",
      },
      {
        text: "Stats",
        href: "/tournaments/womens-t20-worldcup/stats",
      },
      {
        text: "Teams",
        href: "/tournaments/womens-t20-worldcup/teams",
      },
      {
        text: "News",
        href: "/tournaments/womens-t20-worldcup/news",
      },
      {
        text: "videos",
        href: "/tournaments/womens-t20-worldcup/videos",
      },
      {
        text: "Predictor",
        href: "/tournaments/womens-t20-worldcup/predictor",
      },
    ];

    // When using a for of loop, if you use an array like below, the first element will always be assigned to the index, and the second
    // will be the iteratee. You can call them whatever you like.
    for (const [index, listItem] of expectedMenuTextLinks.entries()) {
      const link = menuItems.nth(index).locator("a");
      console.log(link);

      await expect(link).toHaveText(listItem.text);
      await expect(link).toHaveAttribute("href", listItem.href);
    }
  });
});
