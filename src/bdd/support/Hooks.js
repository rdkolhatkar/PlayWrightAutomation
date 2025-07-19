const { Before, After, BeforeStep, AfterStep, Status, AfterAll } = require("@cucumber/cucumber");
const playwright = require('@playwright/test'); // This syntax is required for calling the browser context to invoke the browser page
const { PageObjectManager } = require('../../web/pageObjects/PageObjectManager');


Before(async function () {
    // Navigating to Client APP login page 
    this.browser = await playwright.chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new PageObjectManager(this.page);
});

After(async function () {
    console.log("Inside the After Hook");
});

BeforeStep(function () {
    console.log("Inside the BeforeStep Hook");
});

AfterStep(async function ({ result }) {

    if (result.status == Status.FAILED) {
        await this.page.screenshot({ path: './src/web/Screenshots/error.png' });
    }

});

AfterAll(async function () {
    console.log("delete all the cookies and catches");
    // Clear all cookies
    await this.context.clearCookies();

    // Clear localStorage and sessionStorage
    await this.page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    // To clear cache – use DevTools Protocol (experimental)
    const client = await this.context.newCDPSession(this.page);
    await client.send('Network.clearBrowserCache');
    await client.send('Network.clearBrowserCookies');

    await this.context.close();

    if (this.browser) {
        await this.browser.close();
    }
});