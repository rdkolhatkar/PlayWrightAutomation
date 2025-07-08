const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');
// For running the multiple test scenarios in the Serial manner which are present inside the same .spec.js file we will be using below code syntax
// test.describe.configure({mode: 'serial'}); // We use this {mode: 'serial'} syntax when different test cases are interdependant on one another.
// For running the multiple test scenarios in the parallel manner which are present inside the same .spec.js file we will be using below code syntax
test.describe.configure({mode: 'parallel'});
test('Browser Playwright test', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await page.locator("#username").fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("learning");
   await page.locator("#signInBtn").click();
});

test('page Playwright test', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await page.locator("#username").fill("rahulshetty");
   await page.locator("[type='password']").fill("learning");
   await page.locator("#signInBtn").click();
   await page.locator("[style*='block']").textContent();
   await expect(await page.locator("[style*='block']")).toContainText("Incorrect username/password");
});

test('retrieving the product name', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator("#username");
   const password = page.locator("[type='password']");
   const signInBtn = page.locator("#signInBtn");
   const cardTitles = page.locator(".card-body a");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await page.locator("#username").fill("rahulshetty");
   await page.locator("[type='password']").fill("learn");
   await page.locator("#signInBtn").click();
   await userName.fill(""); 
   await password.fill("");
   await userName.fill("rahulshettyacademy");
   await password.fill("learning");
   await signInBtn.click();
   console.log(await page.locator(".card-body a").nth(0).textContent()); 
   console.log(await page.locator(".card-body a").first().textContent());
   const allProductList = await cardTitles.allTextContents(); 
   console.log(allProductList);
});

test('UI Controls', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator("#username");
   const password = page.locator("[type='password']");
   const signInBtn = page.locator("#signInBtn");
   const documentLink = page.locator("[href*='documents-request']");
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult"); 
   page.pause();
   await page.locator(".radiotextsty").last(); 
   console.log(page.locator(".radiotextsty").last().isChecked());
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('Handling Child Windows', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator("#username");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");
   const [newPage] = await Promise.all( 
      [
         context.waitForEvent('page'), 
         documentLink.click(),
      ]
   )
   const text = await newPage.locator(".red").textContent();
   console.log(text);
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);
   await page.locator("#username").fill(domain);
   await page.pause();

});