import {MapTile} from "../Definitions/MapTile.mjs";

export class MapGenerator {
    static colorMap = {
        island: '#00ff00',
        mountain: '#ffdddd',
        river: '#0000ff',
        valley: '#ff00ff',
        volcano: '#ff0000',
        hills: '#aaffaa',
        swamp: '#00ffff',
        desert: '#ffff00',
        forest: '#006600',
        cave: '#000000',
    };

    static generateMap(land) {
        const coordinateResolution = 100;
        let grid = this.initializeGrid(coordinateResolution);
        grid = this.fillGridWithLand(grid, land.terrains);
        console.log(`GEN:MAP_0%`);
        grid = this.expandTerrains(grid, land.terrains, coordinateResolution);

        let nonNullTiles = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] !== null && grid[i][j] !== undefined) {
                    nonNullTiles.push(grid[i][j]);
                }
            }
        }
        return nonNullTiles;
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

    static expandTerrains(grid, terrains, coordinateResolution) {
        let percent = 0, iterations = 0;
        while (this.gridHasEmptySpace(grid, coordinateResolution)) {
            iterations++;
            const newPercent = Math.floor(this.getPercentFilled(grid, coordinateResolution) * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:MAP_${percent}% (${iterations})`);
            }
            grid = this.expandTerrainsOnce(grid, terrains, coordinateResolution);
        }
        console.log(`GEN:MAP_100%`);
        return grid;
    }

    static getPercentFilled(grid, coordinateResolution) {
        let filled = 0;
        for (let i = 0; i < coordinateResolution; i++) {
            for (let j = 0; j < coordinateResolution; j++) {
                if (grid[i][j] !== null && grid[i][j] !== undefined) {
                    filled++;
                }
            }
        }
        return filled / (coordinateResolution * coordinateResolution);
    }

    static expandTerrainsOnce(grid, terrains, coordinateResolution) {
        for (let terrain of terrains) {
            const adjacentTile = this.getAnyAdjacentEmptyTile(grid, terrain, coordinateResolution);
            if (adjacentTile === null) {
                continue;
            }
            grid[adjacentTile.x][adjacentTile.y] = this.createTile(terrain, adjacentTile);
        }
        return grid;
    }

    static getAnyAdjacentEmptyTile(grid, terrain, coordinateResolution) {
        let radius = 1;
        while (radius < coordinateResolution) {
            for (let i = terrain.coordinates.x - radius; i <= terrain.coordinates.x + radius; i++) {
                const listOfY = [];
                for (let j = terrain.coordinates.y - radius; j <= terrain.coordinates.y + radius; j++) {
                    listOfY.push(j);
                }
                listOfY.sort(() => Math.random() - 0.5);
                for (let j of listOfY) {
                    if (i === terrain.coordinates.x - radius || i === terrain.coordinates.x + radius
                        || j === terrain.coordinates.y - radius || j === terrain.coordinates.y + radius) {
                        continue;
                    }
                    if (i >= 0 && i < coordinateResolution && j >= 0 && j < coordinateResolution
                        && (i !== terrain.coordinates.x || j !== terrain.coordinates.y)
                        && (grid[i][j] === null || grid[i][j] === undefined)) {
                        return {x: i, y: j};
                    }
                }
            }
            radius++;
        }
        return null;
    }

    static gridHasEmptySpace(grid, coordinateResolution) {
        for (let i = 0; i < coordinateResolution; i++) {
            for (let j = 0; j < coordinateResolution; j++) {
                if (grid[i][j] === null || grid[i][j] === undefined) {
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
}