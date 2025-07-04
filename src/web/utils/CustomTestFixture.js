const base = require('@playwright/test'); // Syntax for using the '@playwright/test' for Creating a Custom Test Fixture
// Below Method is used for developing Test Data Fixtures
exports.CustomTest = base.test.extend(
    {
        testDataForPlacingAnOrder: {
            username: "anshika@gmail.com",
            password: "Iamking@000",
            productName: "Zara Coat 4"
        }
    }
)