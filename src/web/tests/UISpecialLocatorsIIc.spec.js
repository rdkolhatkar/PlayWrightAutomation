import { test, expect } from '@playwright/test'

test.only('Playwright Special Locators Test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // Special Playwright Locators
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //.getByLabel() is a special locator that playwright provides which will find the element bases on Labled Text present, but in it's HTML code lable tag should be there as attribute name
    await page.getByLabel("Employed").check(); //.check() method is used for checking the checkbox and radio button
    await page.getByLabel("Gender").selectOption("Female");

    
});
