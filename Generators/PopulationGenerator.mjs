import {Population} from "../Definitions/Population.mjs";
import {CharacterGenerator} from "./CharacterGenerator.mjs";

export class PopulationGenerator {
    static generatePopulation(seed) {
        const startTime = new Date();
        const info = new Population();
        const people = [];
        let percent = 0;
        for (let i = 0; i < info.population; i++) {
            const newPercent = Math.floor(i / info.population * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:POPU_${percent}% (${i}/${info.population})`);
            }
            const character = CharacterGenerator.generateCharacter(info, seed);
            people.push(character);
        }
        const endTime = new Date();
        const diffSeconds = (endTime - startTime) / 1000;
        const formattedDiff = diffSeconds < 1 ? diffSeconds * 1000 + "ms" : diffSeconds + "s";
        return {
            people,
            info,
            generation: {
                time: formattedDiff
            }
        };
    }
}