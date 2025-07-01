const { LoginPageClientApp } = require('../pageObjects/LoginPageClientApp');
const { ClientAppDashboardPage } = require('../pageObjects/ClientAppDashboardPage');
class PageObjectManager {
    constructor(page){
        this.page = page;
        this.loginPageClientApp = new LoginPageClientApp(page);
        this.clientAppDashboardPage = new ClientAppDashboardPage(page);
    }

    getLoginPage(){
        return this.loginPageClientApp;
    }

    getDashboardPage(){
        return this.clientAppDashboardPage;
    }
}
module.exports = {PageObjectManager};