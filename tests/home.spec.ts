import { test, expect } from "@playwright/test";
import exp from "constants";
import { url } from "inspector";

test.describe("Homepage", () => {
  test("Open page and verify url", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com");

    // Expect url to include 'cricket'
    await expect(page).toHaveURL(/.*cricket/);
  });

  test("Assert logo is visible", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com/");

    // Assert logo is visible

    const logo = page.getByAltText("Header Logo");
    await expect(logo).toBeVisible();
  });

  test("Search and verify new url", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com/");

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

    await page.goto("https://www.icc-cricket.com/");

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
    for (const [index, listItem] of expectedMenuTextLinks.entries()) {
      const link = menuItems.nth(index).locator("a");
      console.log(link);

      await expect(link).toHaveText(listItem.text);
      await expect(link).toHaveAttribute("href", listItem.href);
    }
  });

  test("Open new tab and assert the title", async ({ page }) => {
    // Go to homepage
    await page.goto("https://www.icc-cricket.com/");

    // Click on the link and wait for the new tab to get triggered
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByAltText("dp-world-x1422").click(),
    ]);

    // wait for the new page to load
    await newPage.waitForLoadState();

    // Verify page title
    await expect(newPage).toHaveTitle(/DP World/);

    // close the new tab
    await newPage.close();
  });

  test.describe("Standings", () => {
    test("Verify table is divided into two sections with correct number of rows", async ({
      page,
    }) => {
      //Go to standings URL
      await page.goto(
        "https://www.icc-cricket.com/tournaments/womens-t20-worldcup/standings"
      );

      // Count the total number of rows

      const totalRows = page.locator("table tbody tr");

      await expect(totalRows).toHaveCount(5);

      // Verify the 4th row has the border class

      await expect(totalRows.nth(1)).toHaveClass(
        " border-dotted border-b-frostbite h-12 bg-white border-b"
      );

      // Verify CSS value of border line
      await expect(totalRows.nth(1)).toHaveCSS(
        "border-bottom-color",
        "rgb(234, 55, 162)"
      );
    });
  });
});
