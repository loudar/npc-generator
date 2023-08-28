import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Land} from "../Definitions/Land.mjs";

export class LandGenerator {
    static generateName() {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateLand() {
        const land = new Land(this.generateName());

    }

    static generateLocations() {
        /*
        TODO:
         generate land mass with certain properties like island, peninsula, mountainous, cities, towns, villages,
         rivers, lakes, forests, roads, bridges, caves, dungeons, ruins, temples, mines, quarries, farms, fields,
         ports, harbors, fortresses, castles, etc.
        */
    }
}