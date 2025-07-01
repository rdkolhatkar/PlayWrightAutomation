const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');

test.only('UI Client APP Testing', async ({ page }) => {

    const productName = 'Zara Coat 4';
    const email = "anshika@gmail.com";
    const username = "anshika@gmail.com";
    const password = "Iamking@000";

    // Creating object for PageObjectManager class to call all the page objects present inside it
    const pageObjectManager = new PageObjectManager(page);

    // Calling the other page objects with the help of PageObjectManager
    const loginPageClientApp = pageObjectManager.getLoginPage();
    await loginPageClientApp.navigateToClientApp();
    await loginPageClientApp.validLogin(username, password);
    const clientAppDashboardPage = pageObjectManager.getDashboardPage();
    await clientAppDashboardPage.searchProduct(productName);
    await clientAppDashboardPage.navigateToCart();

    await page.locator("div li").first().waitFor()
    const bool = page.locator("h3:has-text('Zara Coat 4')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        dropdownText = await dropdown.locator("button").nth(i).textContent();
        if (dropdownText === " India") {
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

    for (let i = 0; i < await rows.count(); ++i) {
        const roworderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(roworderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


});