const { LoginPageClientApp } = require('../pageObjects/LoginPageClientApp');
const { ClientAppDashboardPage } = require('../pageObjects/ClientAppDashboardPage');
const { OrdersHistoryPage } = require('../pageObjects/OrdersHistoryPage');
const { OrdersReviewPage } = require('../pageObjects/OrdersReviewPage');
const { CartPage } = require('../pageObjects/CartPage');
class PageObjectManager {
    constructor(page) {
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