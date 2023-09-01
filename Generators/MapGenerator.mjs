import {MapTile} from "../Definitions/MapTile.mjs";

export class MapGenerator {
    static generateMap(land) {
        const map = [];
        for (let terrain of land.terrains) {
            const mapTile = new MapTile(terrain.coordinates.x, terrain.coordinates.y, terrain.type);
            // mapTile.addTexture(terrain.type);
            map.push(mapTile);
        }
        return map;
    }
}