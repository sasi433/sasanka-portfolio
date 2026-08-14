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

test("homepage presents the primary story and approved profile image", async ({
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
  await expect(page.getByText(/Academic foundations/).first()).toBeVisible();
  await expect(page.getByText(/One Planet Rating/).first()).toBeAttached();
});

test("hero motion and scroll stories remain controlled and move the portrait into the header", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const identity = page.locator("[data-header-identity]");
  await expect(identity).toHaveAttribute("data-header-identity", "initials");
  await expect(
    page.getByRole("navigation", { name: "Page journey" }),
  ).toHaveCount(0);

  const motionControl = page.getByRole("button", {
    name: "Pause background animation",
  });
  await expect(page.locator(".hero-stage__video")).toBeAttached();
  await expect(
    page.locator(".hero-stage__video source").first(),
  ).toHaveAttribute("src", "/media/hero-engineering-dark.webm");
  await expect(motionControl).toBeVisible();
  await motionControl.click();
  await expect(
    page.getByRole("button", { name: "Play background animation" }),
  ).toBeVisible();

  await page.locator("#engineering-summary").scrollIntoViewIfNeeded();
  await expect(identity).toHaveAttribute("data-header-identity", "portrait");

  const engineeringTriggers = page.locator(
    "#engineering-summary .scroll-story__trigger",
  );
  await engineeringTriggers.nth(2).scrollIntoViewIfNeeded();
  await expect(
    page.locator("#engineering-summary .scroll-story__scene.is-active"),
  ).toContainText("Cloud-Native Delivery");
  await expect(
    page.locator("#engineering-summary .scroll-story__scene").nth(3),
  ).toHaveCSS("opacity", "0");

  await page.locator("#home-intro").scrollIntoViewIfNeeded();
  await expect(identity).toHaveAttribute("data-header-identity", "initials");

  await page.goto("/about");
  await expect(identity).toHaveAttribute("data-header-identity", "portrait");
});

test("verified experience, education, thesis and languages are published", async ({
  page,
}) => {
  await page.goto("/experience");
  await expect(
    page.getByRole("heading", { name: "One Planet Rating" }),
  ).toBeVisible();
  await expect(page.getByText("July 2018 – February 2019")).toBeVisible();
  await expect(
    page.getByText("Backend Developer", { exact: true }),
  ).toBeVisible();

  await page.goto("/about");
  await expect(
    page.getByRole("heading", {
      name: "M.Sc. Electrical Engineering — Signal Processing",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Channel Estimation of OFDM by LS and MMSE Methods",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Jawaharlal Nehru Technological University, Kakinada"),
  ).toBeVisible();
  await expect(page.getByText("Swedish")).toBeVisible();
  await expect(page.getByText("Basic proficiency")).toBeVisible();
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
  await expect(
    page.getByRole("textbox", { name: "Name", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Email", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Subject", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Message", exact: true }),
  ).toBeVisible();
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
  await expect(
    page.locator(".hero-stage__video source").first(),
  ).toHaveAttribute("src", "/media/hero-engineering-light.webm");
  await expect
    .poll(() =>
      page
        .locator(".work-card p")
        .first()
        .evaluate((element) => getComputedStyle(element).color),
    )
    .toBe("rgb(80, 84, 90)");
  const lightThemeAccessibility = await new AxeBuilder({ page }).analyze();
  expect(
    lightThemeAccessibility.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    ),
  ).toEqual([]);
  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem("sasanka-portfolio-theme")),
    )
    .toBe("light");

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/light/);
});

test("visual storytelling uses distinct scene tones and image-led skill and interest chapters", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await expect(
    page.locator("#beyond-code .interest-card img").first(),
  ).toHaveAttribute("src", /gaming-v2\.webp/);

  const career = page.locator("#career-journey");
  await expect(career.locator(".scroll-story__visual").first()).toBeAttached();
  const triggers = career.locator(".scroll-story__trigger");
  await triggers.nth(1).scrollIntoViewIfNeeded();
  await expect(career).toHaveAttribute("data-active-tone", "green");

  await page.goto("/skills");
  const skillsStory = page.locator("#skills-story");
  await expect(skillsStory.locator(".media-scroll-story__scene")).toHaveCount(
    7,
  );
  await expect(
    skillsStory.locator(".media-scroll-story__scene").first().locator("img"),
  ).toHaveAttribute("src", /programming-languages-v2\.webp/);
  await skillsStory
    .locator(".media-scroll-story__trigger")
    .nth(2)
    .scrollIntoViewIfNeeded();
  await expect(
    skillsStory.locator(".media-scroll-story__scene.is-active"),
  ).toContainText("DevOps and Cloud-Native Delivery");
  await expect(
    skillsStory.locator(".media-scroll-story__scene.is-active img"),
  ).toBeVisible();
  await expect(
    skillsStory.locator(".media-scroll-story__scene.is-active"),
  ).toHaveAttribute("data-placement", "top-left");
  const firstSkillBadge = skillsStory
    .locator(
      ".media-scroll-story__scene.is-active .media-scroll-story__badges > *",
    )
    .first();
  const secondSkillBadge = skillsStory
    .locator(
      ".media-scroll-story__scene.is-active .media-scroll-story__badges > *",
    )
    .nth(1);
  const firstSkillBox = await firstSkillBadge.boundingBox();
  const secondSkillBox = await secondSkillBadge.boundingBox();
  expect(secondSkillBox?.y).toBeGreaterThan(firstSkillBox?.y ?? 0);
  expect(
    Math.abs((secondSkillBox?.x ?? 0) - (firstSkillBox?.x ?? 0)),
  ).toBeLessThan(2);
  await expect(
    skillsStory.locator(
      ".media-scroll-story__scene.is-active .media-scroll-story__copy",
    ),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    skillsStory.locator(".media-scroll-story__scene.is-active"),
  ).not.toHaveCSS("box-shadow", "none");
  await expect(
    skillsStory.locator(".media-scroll-story__scene").nth(0),
  ).toHaveCSS("visibility", "hidden");

  await page.goto("/about");
  const beyondCode = page.locator("#beyond-code");
  await expect(beyondCode.locator(".media-scroll-story__scene")).toHaveCount(8);
  await beyondCode
    .locator(".media-scroll-story__trigger")
    .nth(1)
    .scrollIntoViewIfNeeded();
  await expect(
    beyondCode.locator(".media-scroll-story__scene.is-active"),
  ).toContainText("Technology and gadgets");
  await expect(
    beyondCode.locator(".media-scroll-story__scene.is-active img"),
  ).toBeVisible();
  await expect(
    beyondCode.locator(
      ".media-scroll-story__scene.is-active .media-scroll-story__copy",
    ),
  ).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.getByAltText(
      "A dark SUV shown alongside mechanical engineering drawings",
    ),
  ).toBeAttached();

  const beyondBox = await page.locator("#beyond-code-heading").boundingBox();
  const languagesBox = await page.locator("#languages").boundingBox();
  expect(beyondBox?.y).toBeLessThan(languagesBox?.y ?? 0);
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

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/about", "/experience", "/skills", "/work"]) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.scrollWidth,
      `overflow on ${route} at 390px`,
    ).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});

test("essential portfolio content remains readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Backend systems built for reliable delivery.",
    }),
  ).toBeVisible();
  await expect(page.getByText(/One Planet Rating/).first()).toBeVisible();

  await page.goto("/about");
  await expect(
    page.getByRole("heading", {
      name: "Channel Estimation of OFDM by LS and MMSE Methods",
    }),
  ).toBeVisible();

  await page.goto("/skills");
  await expect(
    page.getByRole("heading", { name: "AI-Assisted Engineering" }),
  ).toBeVisible();

  await context.close();
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
  await expect(page.locator(".hero-stage__video")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /background animation/i }),
  ).toHaveCount(0);
  await expect(page.locator("#engineering-summary")).not.toHaveClass(
    /is-enhanced/,
  );
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
