import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Land} from "../Definitions/Land.mjs";
import {Terrain} from "../Definitions/Terrain.mjs";
import {RegionGenerator} from "./RegionGenerator.mjs";

export class LandGenerator {
    static generateName() {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateLand(population) {
        const land = new Land(this.generateName());
        const regionCount = NumberGenerator.random(1, 10, true);
        land.addRegions(this.generateRegions(population, regionCount));
        const terrainCount = NumberGenerator.random(10, 100, true);
        land.addTerrains(this.generateTerrains(terrainCount));
        return land;
    }

    static generateRegions(population, regionCount) {
        const regions = [];
        for (let i = 0; i < regionCount; i++) {
            const size = NumberGenerator.random(1, 10, true);
            regions.push(RegionGenerator.generateRegion(population, size));
        }
        return regions;
    }

    static generateTerrains(count) {
        const terrainTypes = SourceLoader.get("TerrainTypes");
        const coordinateResolution = 100;
        const terrains = [];
        let percent = 0;
        for (let i = 0; i < count; i++) {
            const newPercent = Math.floor(i / count * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:TERR_${percent}% (${i}/${count})`);
            }
            const x = NumberGenerator.random(0, coordinateResolution, true);
            const y = NumberGenerator.random(0, coordinateResolution, true);
            const type = terrainTypes[NumberGenerator.random(0, terrainTypes.length - 1, true)];
            const size = NumberGenerator.random(1, 5, true);
            const terrain = new Terrain(type, size, this.generateTerrainName(type), {x, y});
            terrains.push(terrain);
        }
        return terrains;
    }

    static generateTerrainName(type) {
        const names = SourceLoader.get("TerrainNames/" + type);
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }
}