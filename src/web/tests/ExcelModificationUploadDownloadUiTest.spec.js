const { test, expect, request } = require('@playwright/test');
const { ExcelFileUtils } = require('../utils/ExcelFileUtils');

// In this test scenario we have to download the Excel sheet from browser and then we have to modify it and we have to upload the modified excel sheet on the browser.
// After uploading the modified excel document we have to check if our UI table is displaying the modified excel values in the browser table or not.
test('Upload & Download Excel Validation', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    ExcelFileUtils.writeExcelTest("Sheet1","Mango", 350, { rowChange: 0, colChange: 2 }, "./src/web/data/ModifyTest.xlsx");
    await page.locator("#fileinput").click(); // After clicking on the upload button a new file explorar will open and from there we have to upload the excel sheet. But the file explora is not part of the Web.
    // File explorar is part of local system of our computer. To upload the file we will use the below code
    await page.locator("#fileinput").setInputFiles("./src/web/data/ModifyTest.xlsx");
    // .setInputFiles("./filePath") this is inbuild playwright method for uploading the file. But to use this method we have to make sure that HTML tag should contain {<input type='file' accept=.xlsx,.xlx>::</input>} this syntax

})