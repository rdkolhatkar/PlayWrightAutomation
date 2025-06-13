const {test, expect, request} = require('@playwright/test')//request function is used for WebAPI testing

const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}; // This is JavaScript Object
const orderPayload = {orders: [{country:"India",productOrderedId:"62023a7616fcf72fe9dfc619"}]};
let LoginToken; // let is Javascript method for initializing global value.
let orderId;
// .beforeAll() method will perform the specific task like Login to the website and other stuff before once executing the entire test suite.
  test.beforeAll(  async ()=> {
    // Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload, //Request Body
            headers:{"content-type": "application/json"}
        });
    expect((loginResponse).ok).toBeTruthy();
    const loginResponseJson = await loginResponse.json();//extracting token from the api response and parsing the token
    LoginToken = loginResponseJson.token;
    console.log(LoginToken);

    // Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
          data:orderPayload,
          headers:  {
                      'Authorization': LoginToken,
                      'content-type': 'application/json'
                    }
      }
    )
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];

  });

// .beforeEach() method will perform the specific task like Login to the website and other stuff before executing each test case
  test.beforeEach( async ()=> {

  });
 
  test ('UI Client APP Testing', async ({page})=> {
  // .addInitScript() playwright method is used for Adding or Injecting external JavaScript inside the other methods as an Existing Function and execute that function inside the methods
   page.addInitScript(
    value =>{ 
    window.localStorage.setItem('token', value);
   }, LoginToken 
  );
   const products = page.locator(".card-body");
   const productName = 'Zara Coat 4';
   await page.goto("https://rahulshettyacademy.com/client/");
   const email = 'anshika@gmail.com'
/*
   // We can skip the below test cases for Login by introducing the API, So with this api we don't have to do login for every time when we execute new test cse
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
*/
// Below code is replaced with Order API
/*
   await page.waitForLoadState('networkidle'); // waitForLoadState('networkidle') this method is used when you have to wait till all backend api calls are sucessfully completed and your web page is sucessfully updated with api response

   await page.locator(".card-body b").first().waitFor(); //.waitFor() method will only work when our locators are returning single element. It will not wait in case our locators are returning multiple elements

   const titles = await page.locator(".card-body b").allTextContents();

   console.log(titles);
   
   const totalProductCount = products.count(); // count() method is used to count the total number of products present inside the 'products' array

  for(let i = 0; i < totalProductCount; i++){
   if(await products.nth(i).locator("b").textContent() === productName){ //products.nth(i).locator("b") This method is called as chaining of locators Example: locator("parent").locator("child")
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
   for(let i = 0; i < optionsCount; i++){
   dropdownText = await dropdown.locator("button").nth(i).textContent();
   if(dropdownText === " India"){
     await dropdown.locator("button").nth(i).click();
     break;
   } 
   }
   expect(page.locator(".user_name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
*/
   orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   const rows = await page.locator("tbody tr");

   await page.locator("tbody tr").waitFor();

   for(let i = 0; i < await rows.count(); ++i){
    const roworderId = await rows.nth(i).locator("th").textContent();
    if(orderId.includes(roworderId)){
       await rows.nth(i).locator("button").first().click();
       break;
    }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

   // Verify if order created is showing in the history page
   // Precondition -> create an order -> Use API to create order

   });