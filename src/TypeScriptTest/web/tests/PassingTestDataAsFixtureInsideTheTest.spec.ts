import { expect, Page } from '@playwright/test';
import { CustomTest } from '../utilsTS/customTestFixtures'; // Custom test fixture with test data
import { PageObjectManager } from '../pageObjectsTS/PageObjectManager';

CustomTest.only('Client App login', async ({ page, testDataForPlacingAnOrder }) => {
  const poManager = new PageObjectManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.navigateToClientApp();
  await loginPage.validLogin(
    testDataForPlacingAnOrder.username,
    testDataForPlacingAnOrder.password
  );

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProduct(testDataForPlacingAnOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForPlacingAnOrder.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect('ind', 'India');
  let orderId: any = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToCart();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);

  let fetchedOrderId:any = await ordersHistoryPage.getOrderId();
  expect(orderId.includes(fetchedOrderId)).toBeTruthy();
});
