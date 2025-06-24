const ExcelJs = require('exceljs');

// First Way to run the excel sheet interactions asynchronously 
const workBook = new ExcelJs.Workbook(); // Creating the object of ExcelJs to use the inbuild methods
workBook.xlsx.readFile("./src/JavaScriptTest/TestData/TestData.xlsx").then(function () { // Passing the file path of the TestData.xlsx file

    const workSheet = workBook.getWorksheet('Sheet1'); // Reading the specific sheet name form excel document
    workSheet.eachRow((row, rowNumber) => { // Iterating the rows using the row function in exceljs
        row.eachCell((cell, colNumber) => { // Iterating the cells using the cell function in exceljs
            console.log(cell.value);
        });
    });
})
// Second Way to run the excel sheet interactions asynchronously without .then(function (){})
async function excelDataTest() {
    await workBook.xlsx.readFile("./src/JavaScriptTest/TestData/TestData.xlsx");
    const workSheet = workBook.getWorksheet('Sheet1'); // Reading the specific sheet name form excel document
    workSheet.eachRow((row, rowNumber) => { // Iterating the rows using the row function in exceljs
        row.eachCell((cell, colNumber) => { // Iterating the cells using the cell function in exceljs
            console.log(cell.value);
        });
    });
}
// Calling the function for test execution
excelDataTest();