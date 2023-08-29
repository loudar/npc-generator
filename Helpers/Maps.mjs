export class Maps {
    /**
     * Transforms a Map into an object using the specified property of the keys.
     *
     * @param {Map<object, any>} map - The Map to transform.
     * @param {string} property - The property of the object key to use in the resulting object.
     * @returns {object} - An object with keys based on the specified property of the original Map's keys.
     */
    static transformMap(map, property) {
        const result = {};

        for (let [keyObj, value] of map.entries()) {
            if (keyObj.hasOwnProperty(property)) {
                result[keyObj[property]] = value;
            }
        }

        return result;
    }

    static findKeyWithPropertyValue(map, key, findValue) {
        for (let [keyObj, value] of map.entries()) {
            if (keyObj.hasOwnProperty(key) && keyObj[key] === findValue) {
                return keyObj;
            }
        }
    }

    static getKeys(map) {
        const keys = [];
        for (let [keyObj, value] of map.entries()) {
            keys.push(keyObj);
        }
        return keys;
    }
}