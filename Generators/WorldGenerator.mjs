import {PopulationGenerator} from "./PopulationGenerator.mjs";
import {LandGenerator} from "./LandGenerator.mjs";
import {LanguageGenerator} from "./LanguageGenerator.mjs";
import {CultureGenerator} from "./CultureGenerator.mjs";
import {MapGenerator} from "./MapGenerator.mjs";
import fs from "fs";

export class WorldGenerator {
    static generateWorld(setProgress, seed) {
        console.log("GEN:WORLD:START");
        const population = PopulationGenerator.generatePopulation(setProgress);
        const land = LandGenerator.generateLand(setProgress, population, seed);
        const world = {
            population,
            land,
            map: MapGenerator.generateMap(setProgress, land, population, seed),
            language: LanguageGenerator.generateLanguage(setProgress, seed),
            culture: CultureGenerator.generateCulture(population),
        };
        fs.writeFileSync("lang.json", JSON.stringify(world.language, null, 2));
        console.log("GEN:WORLD:END");
        return world;
    }
}