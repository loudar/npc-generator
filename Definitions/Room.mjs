export class Room {
    constructor(type) {
        this.type = type;
        this.furniture = [];
        return this;
    }

    addFurniture(furniture) {
        this.furniture.push(furniture);
        return this;
    }
}