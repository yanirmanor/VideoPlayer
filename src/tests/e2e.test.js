const { chromium } = require("playwright");

describe("e2e", () => {
  beforeAll(async () => {
    // Load blog page
    await page.goto("http://localhost:3000/");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("should get the url in the list", async () => {
    // Click input[type="text"]
    await page.click('input[type="text"]');
    // Fill input[type="text"]
    await page.fill(
      'input[type="text"]',
      "https://www.youtube.com/watch?v=kl7RhCyDf-M"
    );
    // Click text=Add
    await page.click("text=Add");
    await page.waitForTimeout(1000);

    const item = await page.$eval(
      '[data-testid="list-item-0"]',
      (el) => el.textContent
    );
    expect(item).toBe("https://www.youtube.com/watch?v=kl7RhCyDf-M");
  });

  test("Should get 2 urls in the list", async () => {
    await page.click('input[type="text"]');
    // Fill input[type="text"]
    await page.fill(
      'input[type="text"]',
      "https://www.youtube.com/watch?v=kl7RhCyDf-M"
    );
    // Click text=Add
    await page.click("text=Add");

    await page.waitForTimeout(1000);

    await page.fill(
      'input[type="text"]',
      "https://www.youtube.com/watch?v=rUWxSEwctFU"
    );
    await page.type('input[type="text"]', String.fromCharCode(13));

    await page.waitForTimeout(1000);

    const total = await page.$eval('[data-testid="list"]', (el) => {
      console.log(el);
      return el.children.length;
    });
    expect(total).toBe(2);
  });
});
