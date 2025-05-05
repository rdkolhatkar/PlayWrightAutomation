const {test, expect} = require('@playwright/test');
  
  test.only('UI Client APP Testing', async ({page})=> {

   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();

   await page.waitForLoadState('networkidle'); // waitForLoadState('networkidle') this method is used when you have to wait till all backend api calls are sucessfully completed and your web page is sucessfully updated with api response

   await page.locator(".card-body b").first().waitFor(); //.waitFor() method will only work when our locators are returning single element. It will not wait in case our locators are returning multiple elements

   const titles = await page.locator(".card-body b").allTextContents();

   console.log(titles);


   });