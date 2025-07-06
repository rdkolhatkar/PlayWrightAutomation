// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './src',
  /*Adding Timeouts */
  timeout: 40 * 1000,
  /*Adding timeouts for Assertions */
  expect: {
    timeout: 4 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // This syntax is used for defining multiple properties related to the project
  projects: [
    {
      name: 'safari browser test',
      use: {
        browserName: 'webkit', // setting the browswe name
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure',       
        ...devices['iPhone 11'], // This syntax will let us select the test execution based on the devices like iPhone 11 or any other versions of iPhone
      }
    },
    {
      name: 'chrome browser test',
      use: {
        browserName: 'chromium', // setting the browswe name
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure', // This syntax will allow us to record the video of the test execution only when test fails.
        ignoreHttpsErrors: true, // This syntax is used for handling the SSL certification errors while opening the URL
        permissions:['geolocation'], // This syntax is used to accept the popup which tells us to allow location access.
        trace: 'on',
        viewport : {width:720,height:720} // This syntax will open the browser in {width:720,height:720} this dimention.
      }
    },
    // Note: viewport and ...devices syntax should not be used at the same time, because they will override each other
  ],
});
module.exports = config

