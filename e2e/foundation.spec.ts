import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shared layout and desktop navigation load", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A clear, accessible interface foundation for the portfolio.",
  );
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeHidden();
});

test("dark theme is default and the selected theme persists", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem("sasanka-portfolio-theme")),
    )
    .toBe("light");

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("mobile navigation manages focus and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Home" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("skip link reaches the main content", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("required breakpoints have no horizontal overflow", async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.scrollWidth,
      `overflow at ${width}px`,
    ).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});

test("reduced-motion preference minimizes page animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const animationDurationMs = await page
    .locator(".page-shell")
    .evaluate((element) => {
      const duration = getComputedStyle(element).animationDuration;
      return duration.endsWith("ms")
        ? Number.parseFloat(duration)
        : Number.parseFloat(duration) * 1000;
    });
  expect(animationDurationMs).toBeLessThanOrEqual(0.01);
});

test("homepage has no serious automated accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );

  expect(seriousViolations).toEqual([]);
});
