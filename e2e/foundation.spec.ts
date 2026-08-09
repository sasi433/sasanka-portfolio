import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shared layout and desktop navigation load", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Backend systems built for reliable delivery.",
  );
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeHidden();
});

test("homepage presents the primary journey and approved profile image", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "View My Work" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Contact Me" }).first(),
  ).toBeVisible();
  await expect(page.getByAltText("Portrait of Sasanka Maddala")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "An expanding engineering scope." }),
  ).toBeVisible();
  await expect(
    page.getByText("Volvo Group client assignment · 2025–2026"),
  ).toBeVisible();
});

test("all Phase 2 routes and curated work details load", async ({ page }) => {
  for (const route of [
    "/about",
    "/experience",
    "/work",
    "/skills",
    "/contact",
    "/contact/sent",
    "/privacy",
    "/work/production-incident-simulator",
    "/work/shared-python-libraries",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("unknown work slugs use the custom not-found page", async ({ page }) => {
  const response = await page.goto("/work/not-a-real-item");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "That page could not be found." }),
  ).toBeVisible();
});

test("work is segmented and external repository links are secure", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(
    page.getByRole("heading", {
      name: "Public projects built to solve and explore.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Professional work, explained without proprietary detail.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Active work shown with an honest status.",
    }),
  ).toBeVisible();

  await page.goto("/work/log-report-automation");
  const repositoryLink = page.getByRole("link", {
    name: /View GitHub repository/,
  });
  await expect(repositoryLink).toHaveAttribute("target", "_blank");
  await expect(repositoryLink).toHaveAttribute("rel", /noopener/);
  await expect(
    page.getByRole("link", { name: /live application/i }),
  ).toHaveCount(0);
});

test("contact form is accessible and safely reports missing external setup", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Subject")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send message" }),
  ).toBeDisabled();
  await expect(
    page.getByText(/awaiting its anti-bot configuration/i),
  ).toBeVisible();

  const invalid = await request.post("/api/contact", {
    data: { email: "invalid" },
  });
  expect(invalid.status()).toBe(400);
  const honeypot = await request.post("/api/contact", {
    data: {
      name: "Bot Sender",
      email: "bot@example.com",
      subject: "Automated message",
      message: "This message has enough detail to pass validation.",
      company: "filled",
      turnstileToken: "not-used",
    },
  });
  expect(honeypot.status()).toBe(202);
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
  await page.goto("/");

  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });

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
  await waitForPageAnimation(page);

  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );

  expect(seriousViolations).toEqual([]);
});

test("core routes have no serious automated accessibility violations", async ({
  page,
}) => {
  test.setTimeout(60_000);
  for (const route of [
    "/about",
    "/experience",
    "/work",
    "/skills",
    "/contact",
    "/privacy",
    "/work/shared-python-libraries",
  ]) {
    await page.goto(route);
    await waitForPageAnimation(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      ),
      route,
    ).toEqual([]);
  }
});

async function waitForPageAnimation(page: import("@playwright/test").Page) {
  await page.locator(".page-shell").evaluate(async (element) => {
    const documentTimeline = element.ownerDocument.timeline;
    await Promise.all(
      element
        .getAnimations()
        .filter((animation) => animation.timeline === documentTimeline)
        .map((animation) => animation.finished),
    );
  });
}

test("SEO endpoints and preview indexing policy are present", async ({
  page,
  request,
}) => {
  await page.goto("/work/shared-python-libraries");
  await expect(page).toHaveTitle(/Shared Python Libraries/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000/work/shared-python-libraries",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(
    page.locator('script[type="application\/ld\+json"]'),
  ).toHaveCount(1);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/work/production-incident-simulator");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  expect((await request.get("/opengraph-image")).status()).toBe(200);
});
