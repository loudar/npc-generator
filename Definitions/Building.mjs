export class Building {
    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room);
        return this;
    }

    addRooms(rooms) {
        this.rooms.push(...rooms);
        return this;
    }
}