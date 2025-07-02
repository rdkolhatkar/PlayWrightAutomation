const { test, expect, request } = require('@playwright/test');
const JsonUtility = require('../utils/JsonUtils');

const jsonUtil = new JsonUtility('./src/web/data/SampleFile.json');

test('API test using JSON data', async ({ request }) => {
    const userId = jsonUtil.getValueAsString('userId');

    const response = await request.post('https://api.example.com/data', {
        data: {
            id: userId
        }
    });
    expect(response.status()).toBe(200);
});
