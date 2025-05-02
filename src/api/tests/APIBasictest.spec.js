const { test, expect } = require('@playwright/test');

test('Sample API GET request test', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  // Check status code
  expect(response.status()).toBe(200);

  // Check response body
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('id', 1);
  expect(responseBody).toHaveProperty('title');
  expect(responseBody).toHaveProperty('body');

  console.log('API Test Passed: Retrieved post with ID 1');
});