const { test, expect, request } = require('@playwright/test')

test("Network Test Mocking Request body of Back End API", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    // In this case insted of mocking the API resonse we will be mocking the API request Body to breach the Web Security and view the session. In this case ideal condition is we should get the 404 Unauthorized error response from API and Web session
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }) //.continue() method will intercept api request before it get's posted to the backend. We are intercepting the header because this is a simple GET Call Url
    );
    await page.locator("button:has-text(''View)").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorized to view this order");
});