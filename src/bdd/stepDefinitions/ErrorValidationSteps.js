const { Given, When, Then } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { expect } = require('@playwright/test');

Given('Login to client app ecommerce Website with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await this.page.locator("#username").fill(username);
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator("#signInBtn").click();

});
Then('Verify Error message is displayed.', async function () {
    await this.page.locator("[style*='block']").textContent();
    await expect(await this.page.locator("[style*='block']")).toContainText("Incorrect username/password");
});
