const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/PageObjectManager');
// To use Json File as JavaScript Object First we have to convert it in the String format and after that we have to convert that String into JavaScript Object
const JsonDataSet = JSON.parse(JSON.stringify(require('./src/web/data/TestData.json')));

test('Client App login', async ({ page }) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(JsonDataSet.username, JsonDataSet.password); // Using JsonDataSet to call the username & password value
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(JsonDataSet.productName); // Using JsonDataSet to call the productName value
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});