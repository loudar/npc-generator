import {Population} from "../Info/Population.mjs";
import {CharacterGenerator} from "./CharacterGenerator.mjs";

export class PopulationGenerator {
    static generatePopulation() {
        const startTime = new Date();
        const info = Population.new();
        const people = [];
        // TODO: maybe also generate some general info about culture, locations, etc.
        let percent = 0;
        for (let i = 0; i < info.population; i++) {
            const newPercent = Math.floor(i / info.population * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`${percent}% (${i}/${info.population})`);
            }
            const character = CharacterGenerator.generateCharacter(info);
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