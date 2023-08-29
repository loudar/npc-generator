import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Land} from "../Definitions/Land.mjs";
import {Terrain} from "../Definitions/Terrain.mjs";
import {BuildingGenerator} from "./BuildingGenerator.mjs";

export class LandGenerator {
    static generateName() {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateLand(educationRate) {
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
        const terrainCount = NumberGenerator.random(10, 100, true);
        return this.generateTerrains(terrainCount);
    }

    static generateTerrains(terrainCount) {
        const terrainTypes = SourceLoader.get("TerrainTypes");
        const coordinateSize = 100;
        const terrains = [];
        for (let i = 0; i < terrainCount; i++) {
            const x = NumberGenerator.random(0, coordinateSize);
            const y = NumberGenerator.random(0, coordinateSize);
            const type = terrainTypes[NumberGenerator.random(0, terrainTypes.length - 1, true)];
            const size = NumberGenerator.random(1, 10, true);
            const terrain = new Terrain(type, size, this.generateTerrainName(type), {x, y});
            terrains.push(terrain);
        }
        return terrains;
    }

    static generateTerrainName(type) {
        const names = SourceLoader.get("TerrainNames/" + type);
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateBuilding(educationRate) {
        const building = BuildingGenerator.generateBuilding(educationRate);
    }
}