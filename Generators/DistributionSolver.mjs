import {NumberGenerator} from "./NumberGenerator.mjs";

export class DistributionSolver {
    static chooseKeyByDistribution(distribution, seed) {
        const randomValue = NumberGenerator.getRandomNumber(seed);
        let accumulated = 0;

        const keys = Object.keys(distribution).sort(() => NumberGenerator.getRandomNumber(seed) - 0.5);

        for (let key of keys) {
            accumulated += distribution[key];
            if (randomValue <= accumulated) {
                return key;
            }
        }

        return keys[keys.length - 1];
    }
}