export class MapTile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.texture = null;
        this.color = null;
        this.size = 10;
        this.terrainId = null;
        this.height = 0;
    }

    setTerrainId(id) {
        this.terrainId = id;
    }

    setSize(size) {
        this.size = size;
    }

    setColor(color) {
        this.color = color;
    }

    setTexture(texture) {
        this.texture = texture;
    }

    setHeight(height) {
        this.height = height;
    }
}