const {test, expect} = require('@playwright/test')

test("Popup validations", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); // First we launch this URL as a first url which is rahulshetty academy web site
    await page.goto("http://google.com"); // After launching the first URL we launched the second Url which is Google website
    // Now we want to navigate back to the first Url which is rahulshetty academy web site, but both urls are opened in the same tab, no new tab got opened. To go back we will use the below code.
    await page.goBack();
    // Now again to go forward we will use the below code
    await page.goForward();   
    
})

test.only("More validations", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden(); // This method is used to check if element is hidden or not    
   // Handaling Java Scripts Alerts
   await page.locator("#confirmbtn").click();
   page.on('dialog', dialog => dialog.accept()); // In Playwright we call the Alert as Dialog & dialog => dialog.accept() this method is used for accepting the alerts
   //page.on('dialog', dialog => dialog.dismiss()); // dialog => dialog.dismiss() is used for Cancelling the Alerts

   //Mouse Hover
   await page.locator("#mousehover").hover(); //.hover() will perform the mouse hover action. 
    
})