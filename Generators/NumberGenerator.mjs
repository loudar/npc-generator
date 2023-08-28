export class NumberGenerator {
    /**
     * Generates a random float between min and max.
     * @param min
     * @param max
     * @returns {number}
     */
    static random(min, max, toInt = false) {
        if (min > max) {
            [min, max] = [max, min];
        }
        const value = Math.random() * (max - min) + min;
        return toInt ? Math.floor(value) : value;
    }
}