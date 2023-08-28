export class NumberGenerator {
    /**
     * Generates a random float between min and max.
     * @param min
     * @param max
     * @param toInt
     * @returns {number}
     */
    static random(min, max, toInt = false) {
        if (min > max) {
            [min, max] = [max, min];
        }
        const value = Math.random() * (max - min) + min;
        return toInt ? Math.floor(value) : value;
    }

    static randomWithBias(min, max, bias, influence = 0.5, toInt = false) {
        if (min > max) {
            [min, max] = [max, min];
        }
        const value = Math.random() * (max - min) + min;
        const mix = Math.random() * influence;
        return toInt ? Math.floor(value * (1 - mix) + bias * mix) : value * (1 - mix) + bias * mix;
    }

    static antiExponentialDistribution(n, steepness = 1.2, randomize = 0) {
        if (n <= 0) {
            return [];
        }

        let distribution = [1];
        for (let i = 1; i < n; i++) {
            let nextVal = distribution[0] * steepness + NumberGenerator.random(-randomize, randomize);
            distribution.unshift(nextVal);
        }

        let maxVal = distribution[0];
        for (let i = 0; i < n; i++) {
            distribution[i] /= maxVal;
            distribution[i] = Math.max(0, distribution[i]);
        }

        return distribution;
    }
}