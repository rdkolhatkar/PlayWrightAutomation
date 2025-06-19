const { test, expect, request } = require('@playwright/test')//request function is used for WebAPI testing

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }; // This is JavaScript Object
const orderPayload = { orders: [{ country: "India", productOrderedId: "62023a7616fcf72fe9dfc619" }] };
const mockResponsePayload = { data: [], message: "No Orders" };

let LoginToken; // let is Javascript method for initializing global value.
let orderId;
// .beforeAll() method will perform the specific task like Login to the website and other stuff before once executing the entire test suite.
test.beforeAll(async () => {
  // Login API
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload, //Request Body
      headers: { "content-type": "application/json" }
    });
  expect((loginResponse).ok).toBeTruthy();
  const loginResponseJson = await loginResponse.json();//extracting token from the api response and parsing the token
  LoginToken = loginResponseJson.token;
  console.log(LoginToken);

  // Order API
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        'Authorization': LoginToken,
        'content-type': 'application/json'
      }
    }
  )
  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];

});

// .beforeEach() method will perform the specific task like Login to the website and other stuff before executing each test case
test.beforeEach(async () => {

});

test('Network Test Mocking Response body', async ({ page }) => {
  // .addInitScript() playwright method is used for Adding or Injecting external JavaScript inside the other methods as an Existing Function and execute that function inside the methods
  page.addInitScript(
    value => {
      window.localStorage.setItem('token', value);
    }, LoginToken
  );
  const products = page.locator(".card-body");
  const productName = 'Zara Coat 4';
  await page.goto("https://rahulshettyacademy.com/client/");
  // Now We have to mock the order api in such a way that it will return the empty response as a result our web page will show that there are no orders available
  // In playwright .route() method is used for mocking the api response
  // Below code is used to mock the API response session
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", // in playwright '/*' is used for acceping any value of the order ID
    async route => {
      // Here we are intercepting the api response which browser will send to the front end as rendered data 
      // Here insted of actual response we have to send the mock response to the front end
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(mockResponsePayload); //Converting JavaScript Object to the Json Object
      route.fulfill(
        {
          response,
          body,
        }
      )
    }
  );
  orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());

});