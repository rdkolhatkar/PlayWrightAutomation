const { Before, After, BeforeStep, AfterStep, Status, AfterAll } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { PageObjectManager } = require('../../web/pageObjects/PageObjectManager');

let browser, context, page;

Before({tags: "@Parameterization"}, async function () {
    browser = await playwright.chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    this.browser = browser;
    this.context = context;
    this.page = page;
    this.poManager = new PageObjectManager(page);
});

After({tags: "@ErrorValidation"}, async function () {
    console.log("Inside the After Hook");
});

BeforeStep({tags: "@ErrorValidation"}, function () {
    console.log("Inside the BeforeStep Hook");
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED && page) {
        await page.screenshot({ path: './src/web/Screenshots/error.png' });
    }
});

AfterAll({tags: "@ErrorValidation"}, async function () {
    console.log("delete all the cookies and caches");

    if (context && page) {
        try {
            await context.clearCookies();

            await page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });

            const client = await context.newCDPSession(page);
            await client.send('Network.clearBrowserCache');
            await client.send('Network.clearBrowserCookies');
        } catch (error) {
            console.error("Error clearing cache or cookies in AfterAll:", error);
        }
    }

    if (context) {
        await context.close();
    }

    if (browser) {
        await browser.close();
    }
});
