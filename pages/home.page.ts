import { Page, Locator, expect } from "@playwright/test";

class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;
  readonly menuItems: Locator;
  readonly totalRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText("Header Logo");
    this.searchButton = page.getByRole("link", { name: "Search" });
    this.searchInput = page.getByPlaceholder("what are you looking for?");
    this.menuItems = page.locator(
      "[id^='primaryNavigation_'] .menu-view .menu-list-wrapper > div"
    );
    this.totalRows = page.locator("table tbody tr");
  }

  async navigate() {
    await this.page.goto("https://www.icc-cricket.com");
  }

  async search(term: string) {
    await this.searchButton.click();
    await this.searchInput.fill(term);
    await this.searchInput.press("Enter");
  }

  normalizeArray(arr) {
    {
      return arr.map((item) => item.trim().toLowerCase());
    }
  }

  // When using a for of loop, if you use an array like below, the first element will always be assigned to the index, and the second
  // will be the iteratee. You can call them whatever you like.

  async verifyTextAndMenuLinks(
    expectedMenuTextLinks: { text: string; href: string }[]
  ) {
    for (const [index, listItem] of expectedMenuTextLinks.entries()) {
      const link = this.menuItems.nth(index).locator("a");

      await expect(link).toHaveText(listItem.text);
      await expect(link).toHaveAttribute("href", listItem.href);
    }
  }

  async openNewTabAndVerifyTitle(
    linkAltText: string,
    expectedTitle: RegExp | string
  ) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page.getByAltText(linkAltText).click(),
    ]);

    // wait for the new page to load
    await newPage.waitForLoadState();

    // Verify page title
    await expect(newPage).toHaveTitle(expectedTitle);

    // close the new tab
    await newPage.close();
  }
}

export default HomePage;
