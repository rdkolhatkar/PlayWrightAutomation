const { test, expect } = require('@playwright/test');
const { request } = require('http');
const { text } = require('stream/consumers');


test('Browser Playwright test', async ({ browser }) => {

    const context = await browser.newContext();

    const page = await context.newPage();
    // Blocking the Network API Calls to Abort the Web Service Backend Session
    page.route('**/*.css', route => route.abort()); //.route('**/*.css') this method will block any API Backend Url patterns for calling the css in browser from invoking.
    // .abort() will block the API call to reach the browser
    page.route('**/*.{jpg,png,jpeg}', route => route.abort()); // blocking the images on the web page after product display page is open
    page.on('request', request=> console.log(request.url())); //.on() method will record all the backend network api calls and print in in console, listener method which invoken when an event occurs
    page.on('response', response=> console.log(response.url(), response.status())); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");    
    await page.locator("#signInBtn").click();
});