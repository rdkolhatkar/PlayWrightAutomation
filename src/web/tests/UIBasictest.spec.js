const {test, expect} = require('@playwright/test');


test('Browser Playwright test', async ({browser})=> {

// Positive Test Scenario

   const context = await browser.newContext();

   const page = await context.newPage();

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title()); 
   
   //locators
   await page.locator("#username").fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("learning");
   await page.locator("#signInBtn").click();
});

// When you have multiple test cases and among them you want to run a specific test only, in that case you can use "test.only"

test.only('page Playwright test', async ({page})=> {

// Negative Test Scenario
   
   // Extracting Error Response from invalid login

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title()); 
   
   //locators
   await page.locator("#username").fill("rahulshetty");
   await page.locator("[type='password']").fill("learning");
   await page.locator("#signInBtn").click();


   await page.locator("[style*='block']").textContent(); //.textContent() this method is used in playwright for extracting the text

   await expect(await page.locator("[style*='block']")).toContainText("Incorrect username/password"); //.toContainText method is used to validate expected text and actual error message

 
 });