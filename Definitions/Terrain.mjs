import {IdGenerator} from "../Generators/IdGenerator.mjs";

export class Terrain {
    /**
     * Creates a new terrain object.
     * @param type {string}
     * @param size {number}
     * @param name {string}
     * @param coordinates {{x: number, y: number}}
     * @param height {number}
     */
    constructor(type, size, name, coordinates, height) {
        this.type = type;
        this.size = size;
        this.name = name;
        this.coordinates = coordinates;
        this.buildings = [];
        this.id = IdGenerator.generateId();
        this.height = height;
        return this;
    }
}