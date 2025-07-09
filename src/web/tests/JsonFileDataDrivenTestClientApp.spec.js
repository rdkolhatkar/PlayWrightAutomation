const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/PageObjectManager');
// To use Json File as JavaScript Object First we have to convert it in the String format and after that we have to convert that String into JavaScript Object
const JsonDataSet = JSON.parse(JSON.stringify(require('./src/web/data/TestData.json')));

// There are different Tags in playwright. In Playwright, tags are used to organize, filter, and selectively run tests. They act as labels that allow you to categorize tests based on different criteria, such as functionality, browser type, or testing phase. This enables efficient test execution and reporting, allowing you to focus on specific test subsets when needed

test(' @Web Client App login', async ({ page }) => {
    const poManager = new POManager(page);
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

// Data Driven Test For Passing Json Array with multiple Json Objects inside the parameterized test
// To pass the Array of Json data we have to use the for loop and wrap out test inside it.
// ${data.productName} this syntax will dynamically fetch the product name and pass it inside the test case name for test differentiation
// ${data.productName} To use this syntax we have to give `` these tilt quotes
for(const data of JsonDataSet){
test(`Json Array Data Driven Test For ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password); // Using JsonDataSet to call the username & password value
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName); // Using JsonDataSet to call the productName value
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
}
