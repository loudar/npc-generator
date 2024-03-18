import {PopulationGenerator} from "./PopulationGenerator.mjs";
import {LandGenerator} from "./LandGenerator.mjs";
import {LanguageGenerator} from "./LanguageGenerator.mjs";
import {CultureGenerator} from "./CultureGenerator.mjs";
import {MapGenerator} from "./MapGenerator.mjs";

export class WorldGenerator {
    static generateWorld(setProgress, seed) {
        console.log("GEN:WORLD:START");
        const population = PopulationGenerator.generatePopulation(setProgress);
        const land = LandGenerator.generateLand(setProgress, population, seed);
        const world = {
            population,
            land,
            map: MapGenerator.generateMap(setProgress, land, population),
            language: LanguageGenerator.generateLanguage(setProgress, seed),
            culture: CultureGenerator.generateCulture(population),
        };
        console.log("GEN:WORLD:END");
        return world;
    }
}