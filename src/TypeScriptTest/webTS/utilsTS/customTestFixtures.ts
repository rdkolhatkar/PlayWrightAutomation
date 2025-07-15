import { test as baseTest, expect } from '@playwright/test';

// Define a custom type for the test data
// Defining the interface
interface TestData {
  username: string;
  password: string;
  productName: string;
};

// Extend Playwright's test with custom test data fixture
export const CustomTest = baseTest.extend<{
  testDataForPlacingAnOrder: TestData;
}>({
  testDataForPlacingAnOrder: async ({}, use) => {
    await use({
      username: "anshika@gmail.com",
      password: "Iamking@000",
      productName: "Zara Coat 4"
    });
  }
});
