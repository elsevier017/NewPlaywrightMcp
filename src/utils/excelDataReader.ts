import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require('xlsx');

export interface TestData {
  [key: string]: string | number | boolean;
}

export class ExcelDataReader {
  private workbook: any;
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    if (!fs.existsSync(filePath)) {
      throw new Error(`Excel file not found: ${filePath}`);
    }
    this.workbook = XLSX.readFile(filePath);
  }

  /**
   * Get all rows from a specific sheet
   * @param sheetName The name of the sheet to read
   * @returns Array of objects containing row data
   */
  public getSheetData(sheetName: string): TestData[] {
    const sheet = this.workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet not found: ${sheetName}`);
    }
    const data: TestData[] = XLSX.utils.sheet_to_json(sheet);
    return data;
  }

  /**
   * Get a specific row by index from a sheet
   * @param sheetName The name of the sheet
   * @param rowIndex The index of the row (0-based)
   * @returns Object containing row data
   */
  public getRowData(sheetName: string, rowIndex: number): TestData {
    const data = this.getSheetData(sheetName);
    if (rowIndex >= data.length) {
      throw new Error(`Row index ${rowIndex} out of bounds for sheet ${sheetName}`);
    }
    return data[rowIndex];
  }

  /**
   * Get all sheet names in the workbook
   */
  public getSheetNames(): string[] {
    return this.workbook.SheetNames;
  }
}
