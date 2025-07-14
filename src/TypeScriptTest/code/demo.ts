import { expect, type Locator, type Page } from "@playwright/test";

let message : string = "Hello World"; // Type Script syntax for declaring string variable
console.log(message);
let age : number = 20; // Type Script syntax for declaring integer variable
console.log(age);
let isActive : boolean = false; // Type Script syntax for declaring boolean variable
console.log(isActive);
let numArray : number[] = [1, 2, 3]; // Type Script syntax for declaring Array
console.log(numArray);
let data : any = "This could be anything like String, Integer, array etc.";
console.log(data);
data = 42; // As we have given 'any' as data type value to the variable 'data', we can use data varable for anything.
console.log(data);
data = [1,2,3];
console.log(data);
data = true; 
console.log(data);
// Defining a function
function add(a : number, b : number): number
{
    return a + b
}
console.log(add(3,4));
// Creating an Object
let user: {name:string, age:number} = {name: "Raghav", age: 45};
// Creating class in the typescript
class CartPage {
    page: Page;
    cartProducts: Locator;
    constructor(page: any) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        // this.productsText = page.locator(".card-body b");
        // this.cart = page.locator("[routerlink*='cart']");
        // this.orders = page.locator("button[routerlink*='myorders']");
        // this.checkout = page.locator("text=Checkout");
    }
}
