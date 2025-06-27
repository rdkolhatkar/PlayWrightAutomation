const ExcelJs = require('exceljs');

class ExcelFileUtils {

    constructor(workSheet, searchTextData, replaceTextData, change, filePath) {
        this.workSheet = workSheet;
        this.searchTextData = searchTextData;
        this.replaceTextData = replaceTextData;
        this.change = change;
        this.filePath = filePath;
    }

    async readExcelTestData(getWorkSheet, searchTextData) {
        let output = { row: -1, column: -1 };
        getWorkSheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchTextData) {
                    output.row = rowNumber;
                    output.column = colNumber;
                }
            });
        });
        return output;
    }

    static async writeExcelTest(workSheet, searchTextData, replaceTextData, change, filePath) {
        const workBook = new ExcelJs.Workbook();
        await workBook.xlsx.readFile(filePath);
        const getWorkSheet = workBook.getWorksheet('Sheet1');

        // Reusing the utility instance to call read method
        const utilInstance = new ExcelFileUtils(workSheet, searchTextData, replaceTextData, change, filePath);
        const output = await utilInstance.readExcelTestData(getWorkSheet, searchTextData);

        const cell = getWorkSheet.getCell(output.row, output.column + change.colChange);
        cell.value = replaceTextData;

        await workBook.xlsx.writeFile(filePath);
    }
}

module.exports = { ExcelFileUtils };
