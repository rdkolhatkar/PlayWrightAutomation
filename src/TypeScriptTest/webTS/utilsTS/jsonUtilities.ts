// Import required modules
import * as fs from 'fs';
import * as path from 'path';

export class JsonUtility {
    private jsonData: any;

    constructor(jsonFilePath: string) {
        // Read and parse the JSON file once during initialization
        const fullPath = path.resolve(jsonFilePath);
        const fileData = fs.readFileSync(fullPath, 'utf8');
        this.jsonData = JSON.parse(fileData);
    }

    /**
     * Recursively search for a key in the JSON object, regardless of depth
     * @param obj - Current JSON object or value
     * @param targetKey - Key to search for
     * @returns Value corresponding to the key or null if not found
     */
    static recursiveSearch(obj: any, targetKey: string): any {
        if (typeof obj !== 'object' || obj === null) return null;

        if (Object.prototype.hasOwnProperty.call(obj, targetKey)) {
            return obj[targetKey];
        }

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const result = JsonUtility.recursiveSearch(obj[key], targetKey);
                if (result !== null) return result;
            }
        }

        return null;
    }

    /**
     * Public method to get a key's value as string
     * @param key - Key to extract from JSON
     * @returns Value as a string, or throws error if not found
     */
    getValueAsString(key: string): string {
        const value = JsonUtility.recursiveSearch(this.jsonData, key);
        if (value === null || value === undefined) {
            throw new Error(`Key "${key}" not found in JSON data.`);
        }
        return typeof value === 'object' ? JSON.stringify(value) : String(value);
    }
}
