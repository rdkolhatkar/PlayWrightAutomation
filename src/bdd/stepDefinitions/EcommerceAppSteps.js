const { Given, When, Then } = require('@cucumber/cucumber');
const { playwright } = require('@playwright/test'); // This syntax is required for calling the browser context to invoke the browser page
const assert = require('assert');
const { PageObjectManager } = require('../../web/pageObjects/PageObjectManager');


Given('Login to ecommerce Website with {username} and {password}', async function (username, password) {
    // Navigating to Client APP login page 
    const browser = playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new PageObjectManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.navigateToClientApp();
    await loginPage.validLogin(JsonDataSet.username, JsonDataSet.password);
});
When('Add item {string} to the cart', async function (string) {
    // Adding item to the cart 
    const poManager = new PageObjectManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(JsonDataSet.productName);
    await dashboardPage.navigateToCart();

});
Then('Verify item {string} is displayed in the Cart page', async function (string) {
    // Checking the item in the cart 
    const poManager = new PageObjectManager(page);
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});
When('Enter additional details and place the order', async function () {
    // Verifying the order
    const poManager = new PageObjectManager(page);
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
});
Then('Verify order is present in the OrderHistory page', async function () {
    // Validating the order
    const poManager = new PageObjectManager(page);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});