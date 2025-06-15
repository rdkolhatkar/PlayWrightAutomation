const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: './src/web/data/BrowserState.json'}); //.storageState() method is used for storing all the login data like cookies, browser contexts & storages like Tokens and Site settings
    // Now we have to inject the BrowserState.json file inside the new browser context to invoke browser
    webContext = await browser.newContext({storageState: './src/web/data/BrowserState.json'});

})
  
  test('UI Client APP storageState Testing', async ({page})=> {
   const context = await webContext.newPage(); 
   await page.goto("https://rahulshettyacademy.com/client");
   const products = await page.locator(".card-body");
   const productName = 'Zara Coat 4';
   const email = 'anshika@gmail.com';
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
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
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

   test('UI Client APP storageState Session testing', async ({page})=> {
         const context = await webContext.newPage();
         await page.goto("https://rahulshettyacademy.com/client");
         const products = await page.locator(".card-body");
         const productName = 'Zara Coat 4';
         const email = 'anshika@gmail.com';
         await page.locator(".card-body b").first().waitFor(); //.waitFor() method will only work when our locators are returning single element. It will not wait in case our locators are returning multiple elements
         const titles = await page.locator(".card-body b").allTextContents();
         console.log(titles);
   });