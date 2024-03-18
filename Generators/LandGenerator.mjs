import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Land} from "../Definitions/Land.mjs";
import {Terrain} from "../Definitions/Terrain.mjs";
import {RegionGenerator} from "./RegionGenerator.mjs";
import {DistributionSolver} from "./DistributionSolver.mjs";
import {Config} from "../Config.mjs";

export class LandGenerator {
    static generateName(seed) {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length, seed, true)];
    }

    static generateLand(setProgress, population, seed) {
        const land = new Land(this.generateName(seed));
        const regionCount = NumberGenerator.random(1, 10, seed, true);
        land.addRegions(this.generateRegions(setProgress, population, regionCount, seed));
        const terrainCount = NumberGenerator.random(10, 100, seed, true);
        land.addTerrains(this.generateTerrains(setProgress, terrainCount, seed));
        console.log(`REGION:COUNT:${regionCount}`);
        console.log(`TERRAIN:COUNT:${terrainCount}`);
        return land;
    }

    static generateRegions(setProgress, population, regionCount, seed) {
        const regions = [];
        for (let i = 0; i < regionCount; i++) {
            const size = NumberGenerator.random(1, 10, seed, true);
            regions.push(RegionGenerator.generateRegion(population, size, seed));
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

    static generateTerrainHeightDistribution() {
        return {
            water: 0,
            mountain: 1,
            volcano: 1,
            hills: 0.5,
            valley: 0.2,
            forest: 0.3,
            swamp: 0.05,
            desert: 0.1,
        }
    }

    static generateTerrains(setProgress, count, seed) {
        const coordinateResolution = Config.coordinateResolution;
        const terrains = [];
        let percent = 0;
        const typeDistribution = this.generateTypeDistribution();
        const heightDistribution = this.generateTerrainHeightDistribution();
        for (let i = 0; i < count; i++) {
            const newPercent = Math.floor(i / count * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:TERR_${percent}% (${i}/${count})`);
                setProgress("terrains", percent);
            }
            const x = NumberGenerator.random(0, coordinateResolution, seed, true);
            const y = NumberGenerator.random(0, coordinateResolution, seed, true);
            const type = DistributionSolver.chooseKeyByDistribution(typeDistribution);
            const size = NumberGenerator.random(1, 5, seed, true);
            const terrain = new Terrain(type, size, this.generateTerrainName(type, seed), {x, y}, heightDistribution[type]);
            terrains.push(terrain);
        }
        return terrains;
    }

    static generateTerrainName(type, seed) {
        const names = SourceLoader.get("TerrainNames/" + type);
        return names[NumberGenerator.random(0, names.length, seed, true)];
    }
}