import { test, expect, Locator, Page } from '@playwright/test';
export class ClientAppDashboardPage {

    products:Locator;
    productsText:Locator;
    cart:Locator;

    constructor(page: Page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }

    async searchProduct(productName:string) {

        await this.products.first().waitFor();
        const titles = await this.productsText.allTextContents();

        console.log(titles);

        let totalProductCount:any = this.products.count();

        for (let i = 0; i < totalProductCount; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {

                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }

}

module.exports = {ClientAppDashboardPage};