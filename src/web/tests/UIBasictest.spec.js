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

test('page Playwright test', async ({page})=> {

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

  test('retrieving the product name', async ({browser})=> {

   // Positive Test Scenario      
         
      const context = await browser.newContext();   
      const page = await context.newPage();

       // Parameterizing the variables 
      const userName = page.locator("#username");
      const password = page.locator("[type='password']");
      const signInBtn = page.locator("#signInBtn");
      const cardTitles = page.locator(".card-body a");
   
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title()); 
      
      //locators
      await page.locator("#username").fill("rahulshetty");
      await page.locator("[type='password']").fill("learn");
      await page.locator("#signInBtn").click();

      await userName.fill(""); // to erase or remove the content from a UI field we need to pass empty string in the .fill() method this will automatically erase the existing content
      await password.fill("");
      await userName.fill("rahulshettyacademy");
      await password.fill("learning");
      await signInBtn.click();

      // Grabbing or retrieving the title of the first product in the e-commerce website

      console.log(await page.locator(".card-body a").nth(0).textContent()); // .nth() method will convert the multiple web elements into an array and we have to provide the number of index inside .nth()
      console.log(await page.locator(".card-body a").first().textContent());

      //  Grabbing or retrieving the all product titles present in the e-commerce website
      const allProductList = await cardTitles.allTextContents(); //allTextContents() method retrives the array of titles of the products present in the website.
      console.log(allProductList);

   });

   test.only('UI Controls', async ({page})=> {
      
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const userName = page.locator("#username");
      const password = page.locator("[type='password']");
      const signInBtn = page.locator("#signInBtn");
      const documentLink = page.locator("[href*='documents-request']");
      // Selecting a value from static dropdown
      const dropdown = page.locator("select.form-control"); 
      await dropdown.selectOption("consult") // selectOption() is used to select value from static dropdown and inside this method you have to pass the attribute value which is '[value="consult"]' from the html code {<option value="consult">Consultant</option>}
      page.pause(); // this method will pause the execution and open the Playwright Inspector window
      // Selecting a radio button
      await page.locator(".radiotextsty").last(); // last() method will select the last index of the multiple attributes return from the html xpath or css selector
      // Verify radio button is selected or not using assertion
      //expect(await page.locator(".radiotextsty").last()).toBeChecked();
      console.log(page.locator(".radiotextsty").last().isChecked()); // this method will return the boolean value like true/false
      //UI CheckBox Element test
      await page.locator("#terms").click();
      await expect(page.locator("#terms")).toBeChecked();
      // Method to un-check the CheckBox UI Element
      await page.locator("#terms").uncheck();
      // Assertion for uncheck() method of CheckBox
      expect(await page.locator("#terms").isChecked()).toBeFalsy();
      // There is a link on the Web UI which has a special previlage and that is due to the HTML Attribute class="blinkingText", Due to this attribute the Link will keep on blinking when you open the WebPage
      // To test the blinking element on the webpage we have to check if the blinking attribute is present in the HTML code or not
      await expect(documentLink).toHaveAttribute("class", "blinkingText");
      });