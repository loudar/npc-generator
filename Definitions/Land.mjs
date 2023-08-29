export class Land {
    constructor(name) {
        this.name = name;
        this.locations = [];
        return this;
    }

    addLocation(location) {
        this.locations.push(location);
        return this;
    }

    addLocations(locations) {
        this.locations = this.locations.concat(locations);
        return this;
    }
}