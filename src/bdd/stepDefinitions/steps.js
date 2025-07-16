const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')
const { Greeter } = require('../../src')


Given('Login to ecommerce Website with {username} and {password}', function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
When('Add item {string} to the cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('Verify item {string} is displayed in the Cart page', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
When('Enter additional details and place the order', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('Verify order is present in the OrderHistory page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});