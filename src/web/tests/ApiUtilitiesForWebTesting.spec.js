const { test, expect, request } = require('@playwright/test')//request function is used for WebAPI testing
const { ApiUtils } = require('../utils/ApiUtils');// This syntax to import the Utility folder and all the classes present inside it

// Payloads for API
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }; // This is JavaScript Object
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };


let response; // this method is returning orderId and token from utils class
// .beforeAll() method will perform the specific task like Login to the website and other stuff before once executing the entire test suite.
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

// .beforeEach() method will perform the specific task like Login to the website and other stuff before executing each test case
test.beforeEach(async () => {
});

test('@API Place the Order', async ({ page }) => {
  // Verify if order created is showing in the history page
  // Precondition -> create an order -> Use API to create order

  // .addInitScript() playwright method is used for Adding or Injecting external JavaScript inside the other methods as an Existing Function and execute that function inside the methods
  page.addInitScript(
    value => {
      window.localStorage.setItem('token', value);
    }, response.token
  );

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='myorders']").click();
  const rows = await page.locator("tbody tr");

  await page.locator("tbody tr").waitFor();

  for (let i = 0; i < await rows.count(); ++i) {
    const roworderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(roworderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


});