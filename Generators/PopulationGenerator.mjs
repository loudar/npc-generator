import {Population} from "../Info/Population.mjs";
import {CharacterGenerator} from "./CharacterGenerator.mjs";

export class PopulationGenerator {
    static generatePopulation() {
        const population = Population.population;
        const people = [];
        // TODO: maybe also generate some general info about culture, locations, etc.
        for (let i = 0; i < population; i++) {
            const character = CharacterGenerator.generateCharacter();
            people.push(character);
        }
        return {
            people
        };
    }
}