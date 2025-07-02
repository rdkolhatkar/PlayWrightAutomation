// Import required modules
const fs = require('fs');
const path = require('path');

class JsonUtility {
    constructor(jsonFilePath) {
        // Read and parse the JSON file once during initialization
        const fullPath = path.resolve(jsonFilePath);
        const fileData = fs.readFileSync(fullPath, 'utf8');
        this.jsonData = JSON.parse(fileData);
    }

    /**
     * Recursively search for a key in the JSON object, regardless of depth
     * @param {Object} obj - Current JSON object or value
     * @param {string} targetKey - Key to search for
     * @returns {any} - Value corresponding to the key or null if not found
     */
    static recursiveSearch(obj, targetKey) {
        if (typeof obj !== 'object' || obj === null) return null;

        if (obj.hasOwnProperty(targetKey)) {
            return obj[targetKey];
        }

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const result = JsonUtility.recursiveSearch(obj[key], targetKey);
                if (result !== null) return result;
            }
        }

        return null;
    }

    /**
     * Public method to get a key's value as string
     * @param {string} key - Key to extract from JSON
     * @returns {string} - Value as a string, or throws error if not found
     */
    getValueAsString(key) {
        const value = JsonUtility.recursiveSearch(this.jsonData, key);
        if (value === null || value === undefined) {
            throw new Error(`Key "${key}" not found in JSON data.`);
        }
        return typeof value === 'object' ? JSON.stringify(value) : String(value);
    }
}

module.exports = JsonUtility;
