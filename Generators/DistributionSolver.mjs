export class DistributionSolver {
    static chooseKeyByDistribution(distribution) {
        const randomValue = Math.random();
        let accumulated = 0;

        const keys = Object.keys(distribution).sort(() => Math.random() - 0.5);

        for (let key of keys) {
            accumulated += distribution[key];
            if (randomValue <= accumulated) {
                return key;
            }
        }

        return keys[keys.length - 1];
    }
}