import {MapTile} from "../Definitions/MapTile.mjs";
import {Config} from "../Config.mjs";
import {BuildingGenerator} from "./BuildingGenerator.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {CLI} from "../Utilities/CLI.mjs";

export class MapGenerator {
    static colorMap = {
        island: '#00ff00',
        mountain: '#ffdddd',
        water: '#0000ff',
        valley: '#66aa33',
        volcano: '#ff0000',
        hills: '#aaffaa',
        swamp: '#00ffff',
        desert: '#ffff00',
        forest: '#006600',
        cave: '#000000',
    };

    static generateMap(setProgress, land, population, seed) {
        const coordinateResolution = Config.coordinateResolution;
        let grid = this.initializeGrid(coordinateResolution);
        grid = this.fillGridWithLand(grid, land.terrains);
        grid = this.expandTerrains(setProgress, grid, land.terrains, coordinateResolution);

        let nonNullTiles = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== null && grid[i][j] !== undefined) {
                    nonNullTiles.push(grid[i][j]);
                }
            }
        }
        this.generateHeights(nonNullTiles, seed);
        const buildings = this.generateBuildings(nonNullTiles, coordinateResolution, population, seed);
        return {
            resolution: coordinateResolution,
            tiles: nonNullTiles,
            buildings
        };
    }

    static generateHeights(tiles, seed) {
        const tilesToPropagateHeightFrom = [];
        for (const tile of tiles) {
            if (tile.type === "water") {
                const topTile = tiles.find(t => t.x === tile.x && t.y === tile.y - 1);
                const bottomTile = tiles.find(t => t.x === tile.x && t.y === tile.y + 1);
                const leftTile = tiles.find(t => t.x === tile.x - 1 && t.y === tile.y);
                const rightTile = tiles.find(t => t.x === tile.x + 1 && t.y === tile.y);
                if (topTile && topTile.type !== "water" || bottomTile && bottomTile.type !== "water" || leftTile && leftTile.type !== "water" || rightTile && rightTile.type !== "water") {
                    tilesToPropagateHeightFrom.push(tile);
                }
            }
        }

        if (tilesToPropagateHeightFrom.length === 0) {
            CLI.writeWarning("No water tiles adjacent to land found. Picking random tile.");
            tilesToPropagateHeightFrom.push(tiles[Math.floor(Math.random() * tiles.length)]);
        }

        const generatedTiles = [];
        for (const tile of tilesToPropagateHeightFrom) {
            CLI.rewrite(`Generating heights for tile ${tile.x}, ${tile.y}`);
            this.generateHeightsForAdjacentTiles(tiles, tile, generatedTiles, seed);
        }
        CLI.write("");
        let iteration = 0;
        do {
            iteration++;
            CLI.rewrite(`Generating heights for tiles (${iteration})`);
            for (const tile of generatedTiles) {
                this.generateHeightsForAdjacentTiles(tiles, tile, generatedTiles, seed);
            }
        } while (generatedTiles.length < tiles.length);
        CLI.write("");
    }

    static generateHeightsForAdjacentTiles(tiles, sourceTile, generatedTiles, seed) {
        const topTile = tiles.find(t => t.x === sourceTile.x && t.y === sourceTile.y - 1);
        this.generateTileHeight(topTile, sourceTile.height, generatedTiles, seed);
        const bottomTile = tiles.find(t => t.x === sourceTile.x && t.y === sourceTile.y + 1);
        this.generateTileHeight(bottomTile, sourceTile.height, generatedTiles, seed);
        const leftTile = tiles.find(t => t.x === sourceTile.x - 1 && t.y === sourceTile.y);
        this.generateTileHeight(leftTile, sourceTile.height, generatedTiles, seed);
        const rightTile = tiles.find(t => t.x === sourceTile.x + 1 && t.y === sourceTile.y);
        this.generateTileHeight(rightTile, sourceTile.height, generatedTiles, seed);
    }

    static generateTileHeight(tile, previousTileHeight, generatedTiles, seed) {
        if (!tile) {
            return;
        }
        if (generatedTiles.some(t => t.x === tile.x && t.y === tile.y)) {
            return;
        }
        if (tile.type === "water") {
            tile.setHeight(0);
            generatedTiles.push(tile);
            return;
        }
        tile.setHeight(previousTileHeight + Math.max(0, NumberGenerator.random(-tile.height / 2, tile.height, seed)));
        generatedTiles.push(tile);
    }

    static initializeGrid(coordinateResolution) {
        let grid = new Array(coordinateResolution);
        for (let i = 0; i < coordinateResolution; i++) {
            grid[i] = new Array(coordinateResolution);
        }
        return grid;
    }

    static fillGridWithLand(grid, terrains) {
        for (let terrain of terrains) {
            grid[terrain.coordinates.x][terrain.coordinates.y] = this.createTile(terrain, terrain.coordinates);
        }
        return grid;
    }

    static expandTerrains(setProgress, grid, terrains, coordinateResolution) {
        console.log(`GEN:MAP_0%`);
        let percent = 0, iterations = 0;
        let excludedTerrains = [];
        while (this.gridHasEmptySpace(grid, coordinateResolution)) {
            iterations++;
            const newPercent = Math.floor(this.getPercentFilled(grid, coordinateResolution) * 100);
            if (newPercent > percent || iterations % 10000 === 0) {
                percent = newPercent;
                console.log(`GEN:MAP_${percent}% (${iterations})`);
                setProgress("map", percent);
            }
            grid = this.expandTerrainsOnce(grid, terrains, excludedTerrains, coordinateResolution);
            if (excludedTerrains.length === terrains.length) {
                setProgress("map", 100);
                return grid;
            }
        }
        console.log(`GEN:MAP_100%`);
        return grid;
    }

    static getPercentFilled(grid, coordinateResolution) {
        let filled = 0;
        for (let i = 0; i < coordinateResolution; i++) {
            for (let j = 0; j < coordinateResolution; j++) {
                if (this.tileIsFilled(grid, i, j)) {
                    filled++;
                }
            }
        }
        return filled / (coordinateResolution * coordinateResolution);
    }

    static expandTerrainsOnce(grid, terrains, excludedTerrains, coordinateResolution) {
        let t = 0;
        for (let terrain of terrains) {
            t++;
            if (excludedTerrains.includes(terrain)) {
                continue;
            }
            const tileToFill = this.getAnyAdjacentEmptyTileNew(grid, terrain, coordinateResolution);
            if (tileToFill === null) {
                excludedTerrains.push(terrain);
                continue;
            }
            grid[tileToFill.x][tileToFill.y] = this.createTile(terrain, tileToFill);
        }
        return grid;
    }

    static getAnyAdjacentEmptyTileNew(grid, terrain, coordinateResolution) {
        let radius = 1;
        while (radius < coordinateResolution) {
            const radiusStartTime = Date.now();
            const circleResolution = radius * 16;
            const circle = [];
            for (let i = 0; i < circleResolution; i++) {
                const angle = (i / circleResolution) * Math.PI * 2;
                const x = Math.round(Math.cos(angle) * radius);
                const y = Math.round(Math.sin(angle) * radius);
                if (x === 0 && y === 0) {
                    continue;
                }
                if (!circle.some((coord) => coord.x === x && coord.y === y)) {
                    circle.push({x, y});
                }
            }
            // shuffle the list
            circle.sort(() => Math.random() - 0.5);
            // check each coordinate in the list
            let filled = 0, iterations = 0;
            for (let coordinate of circle) {
                iterations++;
                const x = terrain.coordinates.x + coordinate.x;
                const y = terrain.coordinates.y + coordinate.y;
                if (x < 0 || x >= coordinateResolution || y < 0 || y >= coordinateResolution) {
                    filled++;
                    continue;
                }
                if (this.tileHasSameTerrain(grid, x, y, terrain)) {
                    filled++;
                    continue;
                }
                if (this.isValidTile(grid, x, y, terrain, coordinateResolution)) {
                    return { x, y };
                }
                filled++;
            }
            if (filled === circle.length) {
                radius++;
            }
            const radiusEndTime = Date.now();
            const radiusTimeDiff = radiusEndTime - radiusStartTime;
            if (radiusTimeDiff > 100) {
                console.log(`GEN:MAP:RADIUS:${radius} (${radiusTimeDiff}ms)`);
            }
        }
        return null;
    }

    static isValidTile(grid, x, y, terrain, coordinateResolution) {
        if (this.tileHasDifferentTerrain(grid, x, y, terrain)) {
            return false;
        }
        return this.anySideTileIsSame(grid, x, y, coordinateResolution, terrain);

    }

    static anySideTileIsSame(grid, x, y, coordinateResolution, terrain) {
        const topTile = y > 0 ? this.tileHasSameTerrain(grid, x, y - 1, terrain) : false;
        const bottomTile = y < coordinateResolution - 1 ? this.tileHasSameTerrain(grid, x, y + 1, terrain) : false;
        const leftTile = x > 0 ? this.tileHasSameTerrain(grid, x - 1, y, terrain) : false;
        const rightTile = x < coordinateResolution - 1 ? this.tileHasSameTerrain(grid, x + 1, y, terrain) : false;
        return topTile || bottomTile || leftTile || rightTile;
    }

    static tileIsFilled(grid, x, y) {
        if (x < 0 || x >= grid.length || y < 0 || y >= grid.length) {
            return true;
        }
        return grid[x][y] !== null && grid[x][y] !== undefined;
    }

    static tileHasDifferentTerrain(grid, x, y, terrain) {
        return grid[x][y] !== null && grid[x][y] !== undefined && grid[x][y].type !== terrain.type;
    }

    static tileHasSameTerrain(grid, x, y, terrain) {
        return grid[x][y] !== null && grid[x][y] !== undefined && grid[x][y].type === terrain.type;
    }

    static gridHasEmptySpace(grid, coordinateResolution) {
        for (let i = 0; i < coordinateResolution; i++) {
            for (let j = 0; j < coordinateResolution; j++) {
                if (!this.tileIsFilled(grid, i, j)) {
                    return true;
                }
            }
        }
        return false;
    }

    static createTile(terrain, coordinates){
        const mapTile = new MapTile(coordinates.x, coordinates.y, terrain.type);
        mapTile.setColor(this.getTerrainColor(terrain.type));
        mapTile.setSize(1);
        mapTile.setTerrainId(terrain.id);
        mapTile.setHeight(terrain.height);
        return mapTile;
    }

    static getTerrainColor(terrainType) {
        return this.colorMap[terrainType] || '#777';
    }

    static getRandomColor() {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    /**
     *
     * @param nonNullTiles {MapTile[]}
     * @param resolution
     * @param population {Population}
     * @param seed
     * @returns {*[]}
     */
    static generateBuildings(nonNullTiles, resolution, population, seed) {
        const buildings = [];
        const tileGroups = MapGenerator.generateTileGroups(nonNullTiles, resolution, seed);

        for (const group of tileGroups) {
            for (const tile of group) {
                if (buildings.some(building => building.coordinates.x === tile.x && building.coordinates.y === tile.y)) {
                    CLI.writeWarning(`Building already exists at ${tile.x}, ${tile.y}`);
                    continue;
                }
                const building = BuildingGenerator.generateBuilding(tile, population.educationRate, seed);
                buildings.push(building);
            }
        }
        return buildings;
    }

    static generateTileGroups(tiles, resolution, seed) {
        const groups = [];
        const groupCount = NumberGenerator.randomWithBias(1, resolution * .25, seed, 0.5);
        for (let i = 0; i < groupCount; i++) {
            const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
            const group = [randomTile];
            const groupSize = NumberGenerator.randomWithBias(1, groupCount * .5, seed, 0.5);
            let radius = NumberGenerator.random(1, groupSize * 2, seed);
            let allTilesInRadius = this.getTilesInRadius(tiles, randomTile, radius);
            for (let j = 0; j < groupSize; j++) {
                let randomTileInRadius, checkedIndexes = [];
                do {
                    const index = Math.floor(Math.random() * allTilesInRadius.length);
                    randomTileInRadius = allTilesInRadius[index];
                    checkedIndexes.push(index);
                    if (checkedIndexes.length === allTilesInRadius.length) {
                        radius++;
                        allTilesInRadius = this.getTilesInRadius(tiles, randomTile, radius);
                    }
                } while (randomTileInRadius.type === "water" || groups.some(g => g.some(t => t.x === randomTileInRadius.x && t.y === randomTileInRadius.y)));
                group.push(randomTileInRadius);
            }
            groups.push(group);
        }
        return groups;
    }

    static getTilesInRadius(tiles, randomTile, radius) {
        return tiles.filter(tile => {
            return Math.abs(tile.x - randomTile.x) <= radius && Math.abs(tile.y - randomTile.y) <= radius;
        });
    }
}