import { expect, test } from "@playwright/test";

test("foundation page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Portfolio foundation is ready.",
  );
});
