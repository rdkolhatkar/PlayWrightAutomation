// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

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
  // Retry Flaky Tests, We are using the below syntax to execute retry logic for the test execution
  retries: 2,
  /* Opt out of parallel tests on CI. */
  // We use the below syntax to change the test execution pattern like test execution in series and test execution in parallel manner
  // By setting up the workers as one we are disabling the parallel test execution { workers: 1 }
  // If we set the workers as two then playwright will run two spec.js files in parallel and like that we can set the number of files that we want to run in parallel
  workers: 5,
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

