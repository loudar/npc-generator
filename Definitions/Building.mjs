export class Building {
    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.rooms = [];
        this.coordinates = {x: 0, y: 0};
    }

    addRoom(room) {
        this.rooms.push(room);
        return this;
    }

    addRooms(rooms) {
        this.rooms.push(...rooms);
        return this;
    }

    setCoordinates(coordinates) {
        this.coordinates = coordinates;
        return this;
    }
}