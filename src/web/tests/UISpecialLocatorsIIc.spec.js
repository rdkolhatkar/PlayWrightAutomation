import { test, expect } from '@playwright/test'

test.only('Playwright Special Locators Test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // Special Playwright Locators
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //.getByLabel() is a special locator that playwright provides which will find the element bases on Labled Text present, but in it's HTML code lable tag should be there as attribute name
    await page.getByLabel("Employed").check(); //.check() method is used for checking the checkbox and radio button
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123"); //.getByPlaceholder() Locator will work only if your HTML Element contains the attribute {placeholder='value'}
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();//.filter() method will filter the List of objects and check the {hasText: name} value inside the list
    

    
});
