import {NumberGenerator} from "../Generators/NumberGenerator.mjs";

export class Numbers {
    static toPercent(value, digits = 2) {
        return (value * 100).toFixed(digits) + "%";
    }

    static shuffleArray(array, seed) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(NumberGenerator.getRandomNumber(seed) * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}