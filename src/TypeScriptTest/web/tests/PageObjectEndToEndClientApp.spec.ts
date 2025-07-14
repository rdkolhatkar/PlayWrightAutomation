import { test, expect, Locator, Page } from '@playwright/test';
import { PageObjectManager } from '../pageObjectsTS/PageObjectManager';


test('Client App login', async ({ page }) => {
    const poManager = new PageObjectManager(page);
    const username = "anshika@gmail.com";
    const password = "Iamking@000"
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.navigateToClientApp();
    await loginPage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId: any = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToCart();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});








