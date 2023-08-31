export class Land {
    constructor(name) {
        this.name = name;
        this.regions = [];
        this.terrains = [];
        return this;
    }

    addRegion(region) {
        this.regions.push(region);
        return this;
    }

    addTerrain(terrain) {
        this.terrains.push(terrain);
        return this;
    }

    addRegions(regions) {
        this.regions = this.regions.concat(regions);
        return this;
    }

    addTerrains(terrains) {
        this.terrains = this.terrains.concat(terrains);
        return this;
    }
}