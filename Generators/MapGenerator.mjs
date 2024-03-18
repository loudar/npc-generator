import {MapTile} from "../Definitions/MapTile.mjs";
import {Config} from "../Config.mjs";
import {BuildingGenerator} from "./BuildingGenerator.mjs";

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

    static generateMap(setProgress, land, population) {
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
        const buildings = this.generateBuildings(nonNullTiles, population);
        return {
            resolution: coordinateResolution,
            tiles: nonNullTiles,
            buildings
        };
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
            const adjacentTile = this.getAnyAdjacentEmptyTileNew(grid, terrain, coordinateResolution);
            if (adjacentTile === null) {
                excludedTerrains.push(terrain);
                continue;
            }
            grid[adjacentTile.x][adjacentTile.y] = this.createTile(terrain, adjacentTile);
        }
        return grid;
    }

    static getAnyAdjacentEmptyTileNew(grid, terrain, coordinateResolution) {
        let radius = 1;
        while (radius < coordinateResolution) {
            const radiusStartTime = Date.now();
            const circleResolution = radius * 8;
            const circle = [];
            for (let i = 0; i < circleResolution; i++) {
                const angle = (i / circleResolution) * Math.PI * 2;
                const x = Math.round(Math.cos(angle) * radius);
                const y = Math.round(Math.sin(angle) * radius);
                if (x === 0 && y === 0) {
                    continue;
                }
                circle.push({x, y});
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
        mapTile.terrainId = terrain.id;
        return mapTile;
    }

    static getTerrainColor(terrainType) {
        return this.colorMap[terrainType] || '#777';
    }

    static getRandomColor() {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    static generateBuildings(nonNullTiles, ) {
        const buildings = [];
        for (let tile of nonNullTiles) {
            const buildingChance = 0.01;
            if (Math.random() < buildingChance) {
                const building = BuildingGenerator.generateBuilding()
                buildings.push(building);
            }
        }
        return buildings;
    }
}