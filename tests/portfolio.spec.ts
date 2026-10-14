import { test, expect } from "@playwright/test";

test("page renders, navigation works, and layouts have no overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("Manish — Web3 Creator & KOL Manager");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(13, 13, 16)",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Finding what's early.",
  );
  await expect(
    page.getByRole("link", { name: "Follow me on X" }),
  ).toHaveAttribute("href", "https://x.com/web3manish");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page).toHaveURL(/#about$/);
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Campaigns", exact: true })
      .click();
    await expect(page).toHaveURL(/#campaigns$/);
  }
  for (const width of testInfo.project.name === "mobile"
    ? [320, 360, 390, 650]
    : [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(false);
  }
  expect(errors).toEqual([]);
  expect(
    await page
      .locator("img")
      .evaluateAll(
        (imgs) =>
          imgs.filter(
            (img) =>
              !(img as HTMLImageElement).complete ||
              (img as HTMLImageElement).naturalWidth === 0,
          ).length,
      ),
  ).toBe(0);
});

test("case study opens, contains supplied results, and closes with Escape", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "View Case Study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Xento / Case study" }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Key Learnings" }),
  ).toBeVisible();
  await expect(dialog.getByText("$1,250", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "View Case Study" }),
  ).toBeFocused();
});

test("content filters show the matching format without invented statistics", async ({
  page,
}) => {
  await page.goto("/");
  for (const [category, title] of [
    ["Videos", "Prediction markets, explained."],
    ["X Posts", "Finding the next narrative."],
    ["Threads", "A closer look at Web3."],
    ["UGC", "Made for the feed."],
  ]) {
    await page.getByRole("tab", { name: category, exact: true }).click();
    await expect(page.getByRole("tabpanel").getByRole("heading")).toHaveText(
      title,
    );
    await expect(
      page.getByRole("tabpanel").getByText("Link pending"),
    ).toBeVisible();
  }
  await page.getByRole("tab", { name: /^All/ }).click();
  await expect(page.getByRole("tabpanel").getByRole("article")).toHaveCount(4);
});

test("contact form validates and produces a downloadable brief with Telegram handoff", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start a Conversation" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Your name").fill("Test Creator");
  await page.getByLabel("Your Telegram / X").fill("@testcreator");
  await page.getByLabel("Project / Company").fill("Test project");
  await page.getByLabel("Budget", { exact: true }).fill("$2,000");
  await page
    .getByLabel("Tell me a little about it")
    .fill("Looking for a creator campaign for our new project.");
  await page.getByRole("button", { name: "Start a Conversation" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No message has been sent yet.",
  );
  await expect(
    page.getByRole("link", { name: "Message on Telegram" }),
  ).toHaveAttribute("href", "https://t.me/manishweb3");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save brief" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("manish-campaign-brief.txt");
  const stream = await download.createReadStream();
  let brief = "";
  if (stream) for await (const chunk of stream) brief += chunk.toString();
  expect(brief).toContain("Test Creator");
  expect(brief).toContain("@testcreator");
  expect(brief).toContain("$2,000");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy brief" }).click();
  await expect(
    page.getByRole("button", { name: "Copied", exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "@testcreator",
  );
  await expect(
    page.getByRole("link", { name: "Email", exact: true }),
  ).toHaveCount(0);
});

test("contact API rejects invalid requests and accepts a valid brief", async ({
  request,
}) => {
  const invalid = await request.post("/api/contact", {
    data: { Name: "Test" },
  });
  expect(invalid.status()).toBe(400);
  const valid = await request.post("/api/contact", {
    data: {
      Name: "Test",
      Handle: "@test",
      "Campaign Type": "KOL Campaign",
      Message: "A valid campaign brief for testing.",
    },
  });
  expect(valid.status()).toBe(200);
  expect(await valid.json()).toEqual({ mode: "brief" });
  const bot = await request.post("/api/contact", {
    data: { website: "spam", Name: "Test" },
  });
  expect(bot.status()).toBe(400);
  const badOrigin = await request.post("/api/contact", {
    headers: { origin: "https://other.example.com" },
    data: {},
  });
  expect(badOrigin.status()).toBe(403);
});
