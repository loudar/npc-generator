import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {BuildingGenerator} from "./BuildingGenerator.mjs";

export class RegionGenerator {
    /**
     * Generates a region with a name and locations.
     * @param population {Population}
     * @param size {number} The size of the region.
     * @returns {{name: string, locations: {buildings: Array<Building>}}} A region with a name and locations.
     */
    static generateRegion(population, size) {
        return {
            name: this.generateName(),
            locations: this.generateLocations(population, size)
        };
    }

    static generateName() {
        const names = SourceLoader.get("RegionNames");
        return names[NumberGenerator.random(0, names.length, true)];
    }

    /**
     * Generates locations for a region.
     * @param population {Population}
     * @param size {number} The size of the region.
     * @returns {{buildings: Array<Building>}} Locations for a region.
     */
    static generateLocations(population, size) {
        const buildingCount = NumberGenerator.random(10 * size, 100 * size, true);
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
            buildings.push(BuildingGenerator.generateBuilding(population.educationRate));
        }
        return buildings;
    }
}