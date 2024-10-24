import { test, expect } from "@playwright/test";

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
