import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {BuildingGenerator} from "./BuildingGenerator.mjs";
import {MapGenerator} from "./MapGenerator.mjs";
import {MapTile} from "../Definitions/MapTile.mjs";

export class RegionGenerator {
    /**
     * Generates a region with a name and locations.
     * @param population {Population}
     * @param size {number} The size of the region.
     * @param seed {number} The seed to use for random generation.
     * @returns {{name: string, locations: {buildings: Array<Building>}}} A region with a name and locations.
     */
    static generateRegion(population, size, seed) {
        return {
            name: this.generateName(seed),
            locations: this.generateLocations(population, size, seed)
        };
    }

    static generateName(seed) {
        const names = SourceLoader.get("RegionNames");
        return names[NumberGenerator.random(0, names.length, seed, true)];
    }

    /**
     * Generates locations for a region.
     * @param population {Population}
     * @param size {number} The size of the region.
     * @param seed
     * @returns {{buildings: Array<Building>}} Locations for a region.
     */
    static generateLocations(population, size, seed) {
        const buildingCount = NumberGenerator.random(10 * size, 100 * size, seed, true);
        return {
            buildings: this.generateBuildings(buildingCount, population)
        };
    }

    /**
     * Generates buildings for a region.
     * @param count {number}
     * @param population {Population}
     * @returns {Array<Building>} Buildings for a region.
     */
    static generateBuildings(count, population) {
        const buildings = [];
        for (let i = 0; i < count; i++) {
            buildings.push(BuildingGenerator.generateBuilding(new MapTile(0, 0, "valley"), population.educationRate));
        }
        return buildings;
    }
}