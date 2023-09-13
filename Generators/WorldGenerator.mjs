import {PopulationGenerator} from "./PopulationGenerator.mjs";
import {LandGenerator} from "./LandGenerator.mjs";
import {LanguageGenerator} from "./LanguageGenerator.mjs";
import {CultureGenerator} from "./CultureGenerator.mjs";
import {MapGenerator} from "./MapGenerator.mjs";

export class WorldGenerator {
    static generateWorld(seed) {
        console.log("GEN:WORLD:START");
        const population = PopulationGenerator.generatePopulation();
        const land = LandGenerator.generateLand(population, seed);
        const world = {
            population,
            land,
            map: MapGenerator.generateMap(land, population),
            language: LanguageGenerator.generateLanguage(seed),
            culture: CultureGenerator.generateCulture(population),
        };
        console.log("GEN:WORLD:END");
        return world;
    }
}