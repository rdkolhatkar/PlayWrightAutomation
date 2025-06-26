const ExcelJs = require('exceljs');


const workBook = new ExcelJs.Workbook();
workBook.xlsx.readFile("./src/JavaScriptTest/TestData/TestData.xlsx").then(function () {
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // Now we have to extract a specific value from the excel sheet using row number and coloumn number co-ordinates
            if (cell.value === "Apple") {
                console.log("Row Number of the given value is " + rowNumber);
                console.log("Coloumn Number of the given value is " + colNumber);
            }
        });
    });
});

// Now we have to replace the cell value 'Apple' with another value called 'Iphone' in the ModifyData.xlsx sheet
async function modifyExcelData() {
    await workBook.xlsx.readFile("./src/JavaScriptTest/TestData/ModifyData.xlsx")
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // Now we have to extract a specific value from the excel sheet using row number and coloumn number co-ordinates
            if (cell.value === "Apple") {
                console.log("Row Number of the given value is " + rowNumber);
                console.log("Coloumn Number of the given value is " + colNumber);
            }
        });
    });
    const cell = workSheet.getCell(3, 2); //.getCell(row, coloumn) this method is used to get the cell co-ordinates for updating the cell value
    cell.value = "Iphone"; // cell.value method is used to modify the existing cel value with new cell value
    await workBook.xlsx.writeFile("./src/JavaScriptTest/TestData/ModifyData.xlsx") //workBook.xlsx.writeFile() method is used to save the modified excel workbook
}
modifyExcelData();

// Now we have to extract the colNumber & rowNumber dynamically and place that value inside the method "workSheet.getCell(row, coloumn)"
async function modifyExcelDataTest() {
    let output = { row: 1, column: 1 }; // creating JavaScript object
    await workBook.xlsx.readFile("./src/JavaScriptTest/TestData/ModifyData.xlsx")
    const workSheet = workBook.getWorksheet('Sheet1');
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === "Iphone") {
                output.row = rowNumber; // Assigning the global object to the rowNumber
                output.column = colNumber; // Assigning the global object to the colNumber
            }
        });
    });
    const cell = workSheet.getCell(output.row, output.column); //.getCell(row, coloumn) this method is used to get the cell co-ordinates for updating the cell value
    cell.value = "Apple"; // cell.value method is used to modify the existing cel value with new cell value
    await workBook.xlsx.writeFile("./src/JavaScriptTest/TestData/ModifyData.xlsx") //workBook.xlsx.writeFile() method is used to save the modified excel workbook
}
modifyExcelDataTest();

//Creating the Separate function for reading and writing the Excel sheet data.
// Creating a Generic method or utility for reading the cell value
async function readExcelData(workSheet, searchTextData) {
    let output = { row: 1, column: 1 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchTextData) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
};

async function writeExcel(searchTextData, replaceTextData, filePath) {

    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet('Sheet1');
    const output = await readExcelData(workSheet, searchTextData); // Creating a separate function for reading the excel data
    const cell = workSheet.getCell(output.row, output.column);
    cell.value = replaceTextData;
    await workBook.xlsx.writeFile(filePath);
};

writeExcel("Banana", "Orange", "./src/JavaScriptTest/TestData/ModifyData.xlsx"); //writeExcel("searchTextData","replaceTextData","filePath") We are passing these arguments dynamically

// Update Mango price to 350
async function readExcelTestData(workSheet, searchTextData) {
    let output = { row: 1, column: 1 };
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchTextData) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
};
async function writeExcelTest(searchTextData, replaceTextData, change, filePath) {

    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet('Sheet1');
    const output = await readExcelData(workSheet, searchTextData);
    const cell = workSheet.getCell(output.row, output.column + change.colChange);// Adding the y co-ordinate to the cell column co-ordinate to reah the price column co-ordinate
    cell.value = replaceTextData;
    await workBook.xlsx.writeFile(filePath);
};
writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "./src/JavaScriptTest/TestData/ModifyData.xlsx");

