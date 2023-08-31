import {PopulationGenerator} from "./PopulationGenerator.mjs";
import {LandGenerator} from "./LandGenerator.mjs";
import {LanguageGenerator} from "./LanguageGenerator.mjs";
import {CultureGenerator} from "./CultureGenerator.mjs";

export class WorldGenerator {
    static generateWorld() {
        const population = PopulationGenerator.generatePopulation();
        console.log("GEN:WORLD:START");
        const world = {
            population,
            land: LandGenerator.generateLand(population),
            language: LanguageGenerator.generateLanguage(),
            culture: CultureGenerator.generateCulture(population)
        };
        console.log("GEN:WORLD:END");
        return world;
    }
}