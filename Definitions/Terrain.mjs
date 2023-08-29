import {IdGenerator} from "../Generators/IdGenerator.mjs";

export class Terrain {
    /**
     * Creates a new terrain object.
     * @param type {string}
     * @param size {number}
     * @param name {string}
     * @param coordinates {{x: number, y: number}}
     */
    constructor(type, size, name, coordinates) {
        this.type = type;
        this.size = size;
        this.name = name;
        this.coordinates = coordinates;
        this.buildings = [];
        this.id = IdGenerator.generateId();
        return this;
    }
}