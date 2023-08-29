import {Rooms} from "../Definitions/Rooms.mjs";

export class RoomGenerator {
    static generateRoom(educationRate, buildingType) {

    }

    static generateRoomByType(type) {
        return this.roomTypeMap[type];
    }

    static roomTypeMap = {
        Bedroom: Rooms.Bedroom(),
        Kitchen: Rooms.Kitchen(),
        Bathroom: Rooms.Bathroom(),
        LivingRoom: Rooms.LivingRoom(),
        DiningRoom: Rooms.DiningRoom(),
        ShopFloor: Rooms.ShopFloor(),
        Storage: Rooms.Storage(),
        Office: Rooms.Office(),
        Bar: Rooms.Bar(),
        Classroom: Rooms.Classroom(),
        TeacherOffice: Rooms.TeacherOffice(),
        Library: Rooms.Library(),
        Gymnasium: Rooms.Gymnasium(),
    }
}