import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Land} from "../Definitions/Land.mjs";
import {Terrain} from "../Definitions/Terrain.mjs";

export class LandGenerator {
    static generateName() {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateLand() {
        const land = new Land(this.generateName());
        return land;
    }

    static generateLocations() {
        /*
        TODO:
         generate land mass with certain properties like island, peninsula, mountainous, cities, towns, villages,
         rivers, lakes, forests, roads, bridges, caves, dungeons, ruins, temples, mines, quarries, farms, fields,
         ports, harbors, fortresses, castles, etc.
        */
        return this.generateTerrains();
    }

    static generateTerrains() {
        const terrainTypes = SourceLoader.get("TerrainTypes");
        const terrainCount = NumberGenerator.random(10, 20, true);
        const coordinateSize = 100;
        const terrains = [];
        for (let i = 0; i < terrainCount; i++) {
            const x = NumberGenerator.random(0, coordinateSize);
            const y = NumberGenerator.random(0, coordinateSize);
            const type = terrainTypes[NumberGenerator.random(0, terrainTypes.length - 1, true)];
            const terrain = new Terrain(type, this.generateTerrainName(type), {x, y});
            terrains.push(terrain);
        }
        return terrains;
    }

    static generateTerrainName(type) {
        const names = SourceLoader.get("TerrainNames/" + type);
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateBuilding() {
    }
}