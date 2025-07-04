const { expect } = require('@playwright/test');
const { CustomTest } = require('../utils/CustomTestFixture'); // Syntax for calling Custom Test Fixture
const { POManager } = require('../pageObjects/PageObjectManager');

CustomTest.only('Client App login', async ({ page, testDataForPlacingAnOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForPlacingAnOrder.username, testDataForPlacingAnOrder.password); // Passing UserName and Password as a Fixture
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForPlacingAnOrder.productName); // Passing ProductName as a Fixture
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