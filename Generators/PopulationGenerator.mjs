import {Population} from "../Info/Population.mjs";
import {CharacterGenerator} from "./CharacterGenerator.mjs";

export class PopulationGenerator {
    static generatePopulation() {
        const population = Population.new();
        const people = [];
        // TODO: maybe also generate some general info about culture, locations, etc.
        let percent = 0;
        for (let i = 0; i < population.population; i++) {
            const newPercent = Math.floor(i / population.population * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`${percent}% (${i}/${population.population})`);
            }
            const character = CharacterGenerator.generateCharacter(population);
            people.push(character);
        }
        return {
            people,
            info: population
        };
    }
}