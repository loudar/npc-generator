export class PropertyStore {
    constructor() {
        this.properties = [];
    }

    addProperty(property) {
        this.properties.push(property);
        return this;
    }
}