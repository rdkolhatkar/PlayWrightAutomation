const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test.only("Calendar Validation", async ({page})=>{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    //To select the year list menu on the calendar we have to click on same navigation label twice.
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click(); //Number(monthNumber) by using this method we can convert string to the number
    await page.locator("//abbr[text()='"+ date +"']").click();
})