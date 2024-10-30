import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe("Homepage", () => {
  test("Open page and verify url", async ({ page }) => {
    const homePage = new HomePage(page);
    // Go to homepage
    await homePage.navigate();

    // Expect url to include 'cricket'
    await expect(page).toHaveURL(/.*cricket/);
  });

  test("Assert logo is visible", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Assert logo is visible
    await expect(homePage.logo).toBeVisible();
  });

  test("Search and verify new url", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Click on search icon
    await homePage.searchButton.click();

    //Select search field, fill and click search
    await homePage.search("India");

    // Assert URL to contain search?q=india
    expect(page.url()).toContain("search?q=India");
  });

  test("Verify menu tabs text and link", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Check that the text matches the menu tabs
    const expectedMenuText = [
      "matches",
      "rankings",
      "news",
      "videos",
      "videos",
      "teams",
      "awards",
      "travel",
      "shop",
    ];

    const menuText = await homePage.menuItems.allInnerTexts();

    const normalizedMenuText = homePage.normalizeArray(menuText);
    const normalizedExpectedMenuText =
      homePage.normalizeArray(expectedMenuText);

    expect(await normalizedMenuText).toEqual(normalizedExpectedMenuText);

    // Check menu links and text match

    const expectedMenuTextLinks = [
      { text: "Matches", href: "/fixtures-results/" },
      {
        text: "Rankings",
        href: "/rankings/",
      },
      {
        text: "News",
        href: "/news",
      },
      {
        text: "videos",
        href: "/videos/",
      },
      {
        text: "videos",
        href: "/videos/",
      },
      {
        text: "Teams",
        href: "/teams/men",
      },
      {
        text: "Awards",
        href: "/awards/",
      },
      {
        text: "Travel",
        href: "https://www.icctravelandtours.com/icc-mens-t20-world-cup-west-indies-usa-2024/",
      },
      {
        text: "Shop",
        href: "/tournaments/t20cricketworldcup/shop",
      },
    ];

    // When using a for of loop, if you use an array like below, the first element will always be assigned to the index, and the second
    // will be the iteratee. You can call them whatever you like.

    await homePage.verifyTextAndMenuLinks(expectedMenuTextLinks);
  });

  test("Open new tab and assert the title", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();

    // Go to homepage
    await homePage.navigate();

    // Click on the link and wait for the new tab to get triggered

    await homePage.openNewTabAndVerifyTitle("dp-world-x1422", /DP World/);
  });

  test.describe("Standings", () => {
    test("Verify table is divided into two sections with correct number of rows", async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      //Go to standings URL
      await page.goto(
        "https://www.icc-cricket.com/tournaments/womens-t20-worldcup/standings"
      );

      // Count the total number of rows

      await expect(homePage.totalRows).toHaveCount(5);

      // Verify the 4th row has the border class
      await expect(homePage.totalRows.nth(1)).toHaveClass(
        " border-dotted border-b-frostbite h-12 bg-white border-b"
      );

      // Verify CSS value of border line
      await expect(homePage.totalRows.nth(1)).toHaveCSS(
        "border-bottom-color",
        "rgb(234, 55, 162)"
      );
    });
  });
});
