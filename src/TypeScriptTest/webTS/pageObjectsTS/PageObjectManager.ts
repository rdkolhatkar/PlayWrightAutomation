import { LoginPageClientApp } from '../pageObjectsTS/LoginPageClientApp'; // This is TypeScript Syntax to import the class
import { ClientAppDashboardPage } from '../pageObjectsTS/ClientAppDashboardPage';
import { OrdersHistoryPage } from '../pageObjectsTS/OrdersHistoryPage';
import { OrdersReviewPage } from '../pageObjectsTS/OrdersReviewPage';
import { CartPage } from '../pageObjectsTS/CartPage';
import { Page } from '@playwright/test';

export class PageObjectManager {

    // Here we are declaring the returntype of all the variables, classes and methods
    loginPageClientApp:LoginPageClientApp;
    clientAppDashboardPage:ClientAppDashboardPage;
    ordersHistoryPage:OrdersHistoryPage;
    ordersReviewPage:OrdersReviewPage;
    cartPage:CartPage;
    page:Page;

    constructor(page:any) {
        this.page = page;
        this.loginPageClientApp = new LoginPageClientApp(page);
        this.clientAppDashboardPage = new ClientAppDashboardPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage() {
        return this.loginPageClientApp;
    }

    getDashboardPage() {
        return this.clientAppDashboardPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getCartPage() {
        return this.cartPage;
    }
}
module.exports = { PageObjectManager };