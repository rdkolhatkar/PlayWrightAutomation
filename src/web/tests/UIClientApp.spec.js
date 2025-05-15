const {test, expect} = require('@playwright/test');
  
  test.only('UI Client APP Testing', async ({page})=> {

   const products = page.locator(".card-body");
   const productName = 'Zara Coat 4';
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();

   await page.waitForLoadState('networkidle'); // waitForLoadState('networkidle') this method is used when you have to wait till all backend api calls are sucessfully completed and your web page is sucessfully updated with api response

   await page.locator(".card-body b").first().waitFor(); //.waitFor() method will only work when our locators are returning single element. It will not wait in case our locators are returning multiple elements

   const titles = await page.locator(".card-body b").allTextContents();

   console.log(titles);
   
   const totalProductCount = products.count(); // count() method is used to count the total number of products present inside the 'products' array

  for(let i = 0; i < totalProductCount; i++){
   if(await products.nth(i).locator("b").textContent() == productName){ //products.nth(i).locator("b") This method is called as chaining of locators Example: locator("parent").locator("child")
    // Writing the Logic to add item to thr cart
    await products.nth(i).locator("text= Add To Cart").click();
    break;
   }
  }


   });