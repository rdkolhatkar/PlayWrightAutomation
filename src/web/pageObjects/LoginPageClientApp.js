class LoginPageClientApp {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.loginPassword = page.locator("#userPassword");
    }
    async navigateToClientApp(){
        await this.page.navigateToClientApp("https://rahulshettyacademy.com/client");
    };
    // This method is common for all the test cases for client app
    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.loginPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
};
module.exports = { LoginPageClientApp };