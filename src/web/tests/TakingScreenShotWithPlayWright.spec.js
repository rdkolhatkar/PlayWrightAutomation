const { test, expect } = require('@playwright/test')

test("Taking ScreenShots & Visual comparison", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    // Taking the Screenshots of the whole page for Validating the visibility of an element
    await page.screenshot({path: './src/web/Screenshots/Screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Taking ScreenShot of the specific element", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
     // Taking the Screenshots of the certain element for element level validation
    await page.locator("#displayed-text").screenshot({path: './src/web/Screenshots/PartialElementScreenshot.png'});
    await page.locator("#hide-textbox").click();   
    await expect(page.locator("#displayed-text")).toBeHidden();
});