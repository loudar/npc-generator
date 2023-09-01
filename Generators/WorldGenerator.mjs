import {PopulationGenerator} from "./PopulationGenerator.mjs";
import {LandGenerator} from "./LandGenerator.mjs";
import {LanguageGenerator} from "./LanguageGenerator.mjs";
import {CultureGenerator} from "./CultureGenerator.mjs";
import {MapGenerator} from "./MapGenerator.mjs";

export class WorldGenerator {
    static generateWorld() {
        console.log("GEN:WORLD:START");
        const population = PopulationGenerator.generatePopulation();
        const land = LandGenerator.generateLand(population);
        const world = {
            population,
            land,
            map: MapGenerator.generateMap(land),
            language: LanguageGenerator.generateLanguage(),
            culture: CultureGenerator.generateCulture(population),
        };
        console.log("GEN:WORLD:END");
        return world;
    }
}