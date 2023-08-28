export class Numbers {
    static toPercent(value, digits = 2) {
        return (value * 100).toFixed(digits) + "%";
    }
}