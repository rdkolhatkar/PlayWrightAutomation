const { test, expect } = require('@playwright/test');

test.only('UI Client APP Testing', async ({ page }) => {

  const products = page.locator(".card-body");
  const productName = 'Zara Coat 4';
  const email = 'anshika@gmail.com'
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();


  await page.waitForLoadState('networkidle'); // waitForLoadState('networkidle') this method is used when you have to wait till all backend api calls are sucessfully completed and your web page is sucessfully updated with api response

  await page.locator(".card-body b").first().waitFor(); //.waitFor() method will only work when our locators are returning single element. It will not wait in case our locators are returning multiple elements

  const titles = await page.locator(".card-body b").allTextContents();

  console.log(titles);

  const totalProductCount = products.count(); // count() method is used to count the total number of products present inside the 'products' array

  for (let i = 0; i < totalProductCount; i++) {
    if (await products.nth(i).locator("b").textContent() === productName) { //products.nth(i).locator("b") This method is called as chaining of locators Example: locator("parent").locator("child")
      // Writing the Logic to add item to thr cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor() //waitFor() method will wait until locator becomes visible on the UI Page
  const bool = page.locator("h3:has-text('Zara Coat 4')").isVisible(); // "h3:has-text('Zara Coat 4')" This Syntax is for searching the element by text name this is called as pseudo class locator
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  // Selecting Dynamic dropdown
  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    dropdownText = await dropdown.locator("button").nth(i).textContent();
    if (dropdownText === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  expect(page.locator(".user_name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  const rows = await page.locator("tbody tr");

  await page.locator("tbody tr").waitFor();

  for (let i = 0; i < await rows.count(); ++i) {
    const roworderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(roworderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();


});