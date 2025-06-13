const {test, expect, request} = require('@playwright/test')//request function is used for WebAPI testing
const {ApiUtils} = require('./web/utils/ApiUtils'); // This syntax to import the Utility folder and all the classes present inside it

// Payloads for API
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}; // This is JavaScript Object
const orderPayload = {orders: [{country:"India",productOrderedId:"62023a7616fcf72fe9dfc619"}]};

let LoginToken; // let is Javascript method for initializing global value.
let orderId;
// .beforeAll() method will perform the specific task like Login to the website and other stuff before once executing the entire test suite.
  test.beforeAll(  async ()=> {   
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    apiUtils.creatOrder(orderPayload);
  });

// .beforeEach() method will perform the specific task like Login to the website and other stuff before executing each test case
  test.beforeEach( async ()=> {
  });
 
  test ('UI Client APP Testing', async ({page})=> {
   // Verify if order created is showing in the history page
   // Precondition -> create an order -> Use API to create order

  // Importing the Utility class
  const apiUtils = new ApiUtils(apiContext, loginPayload);

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

  //Calling the external utility from utils folder
   const orderID = creatOrder(orderPayload); // Sending order payload as a parameter in the creatOrder() method utility

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


   });