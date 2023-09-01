import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Land} from "../Definitions/Land.mjs";
import {Terrain} from "../Definitions/Terrain.mjs";
import {RegionGenerator} from "./RegionGenerator.mjs";
import {DistributionSolver} from "./DistributionSolver.mjs";

export class LandGenerator {
    static generateName() {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length, true)];
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

    static generateTypeDistribution() {
        return {
            mountain: 0.1,
            water: 0.1,
            valley: 0.3,
            volcano: 0.05,
            hills: 0.1,
            swamp: 0.05,
            desert: 0.1,
            forest: 0.4,
        }
    }

    static generateTerrains(count) {
        const coordinateResolution = 200;
        const terrains = [];
        let percent = 0;
        const typeDistribution = this.generateTypeDistribution();
        for (let i = 0; i < count; i++) {
            const newPercent = Math.floor(i / count * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:TERR_${percent}% (${i}/${count})`);
            }
            const x = NumberGenerator.random(0, coordinateResolution, true);
            const y = NumberGenerator.random(0, coordinateResolution, true);
            const type = DistributionSolver.chooseKeyByDistribution(typeDistribution);
            const size = NumberGenerator.random(1, 5, true);
            const terrain = new Terrain(type, size, this.generateTerrainName(type), {x, y});
            terrains.push(terrain);
        }
        return terrains;
    }

    static generateTerrainName(type) {
        const names = SourceLoader.get("TerrainNames/" + type);
        return names[NumberGenerator.random(0, names.length, true)];
    }
}