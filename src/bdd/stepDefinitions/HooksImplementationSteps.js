const { Given, When, Then } = require('@cucumber/cucumber');
const playwright = require('@playwright/test'); // This syntax is required for calling the browser context to invoke the browser page
const assert = require('assert');
const { expect } = require('@playwright/test');
const { PageObjectManager } = require('../../web/pageObjects/PageObjectManager');

// In this file we are implementing the Hooks
Given('Login to ecommerce Website with {string} and {string}', {timeout : 100*1000}, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.navigateToClientApp();
    await loginPage.validLogin(username, password);
});
When('Add item {string} to the cart', async function (productName) {
    // Adding item to the cart 
    // const poManager = new PageObjectManager(page);
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProduct(productName);
    await this.dashboardPage.navigateToCart();
});
Then('Verify item {string} is displayed in the Cart page', async function (productName) {
    // Checking the item in the cart 
    // const poManager = new PageObjectManager(page);
    const cartPage = await this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});
When('Enter additional details and place the order', async function () {
    // Verifying the order
    // const poManager = new PageObjectManager(page);
    const ordersReviewPage = await this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
});
Then('Verify order is present in the OrderHistory page', async function () {
    // Validating the order
    // const poManager = new PageObjectManager(page);
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = await this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

