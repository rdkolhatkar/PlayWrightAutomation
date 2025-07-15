import { test, expect, Locator, Page } from '@playwright/test';
export class LoginPageClientApp { // In TypeScript we use export keyword before our class name to export the class
    
    loginPassword:Locator;
    signInButton:Locator;
    userName:Locator;
    page:Page;
    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.loginPassword = page.locator("#userPassword");
    }
    async navigateToClientApp(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    };
    // This method is common for all the test cases for client app
    async validLogin(username:string, password:string) {
        await this.userName.fill(username);
        await this.loginPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
};
module.exports = { LoginPageClientApp };