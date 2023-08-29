export class IdGenerator {
    /**
     * Generates a random id with a length of 9 characters.
     * @returns {string}
     */
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}