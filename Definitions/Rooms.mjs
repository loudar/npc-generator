import {Room} from "./Room.mjs";

export class Rooms {
    static Bedroom() {
        return new Room("Bedroom")
            .addFurniture("Bed");
    }

    static LivingRoom() {
        return new Room("Living Room")
            .addFurniture("Couch")
            .addFurniture("Coffee Table");
    }

    static Stage() {
        return new Room("Stage");
    }

    static DressingRoom() {
        return new Room("Dressing Room");
    }

    static ShopFloor() {
        return new Room("Shop Floor");
    }

    static Study() {
        return new Room("Study");
    }

    static Laboratory() {
        return new Room("Laboratory");
    }

    static Workshop() {
        return new Room("Workshop");
    }

    static Office() {
        return new Room("Office");
    }

    static Bar() {
        return new Room("Bar");
    }

    static Shrine() {
        return new Room("Shrine");
    }

    static Hallway() {
        return new Room("Hallway");
    }

    static Hall() {
        return new Room("Hall");
    }

    static SacrificialChamber() {
        return new Room("Sacrificial Chamber");
    }

    static Gallery() {
        return new Room("Gallery");
    }

    static TrapRoom() {
        return new Room("Trap Room");
    }

    static RoomWithBridge() {
        return new Room("Room with Bridge");
    }

    static RoomWithPit() {
        return new Room("Room with Pit");
    }

    static RoomWithWater() {
        return new Room("Room with Water");
    }

    static RoomWithLava() {
        return new Room("Room with Lava");
    }

    static RoomWithPillars() {
        return new Room("Room with Pillars");
    }

    static RoomWithStatues() {
        return new Room("Room with Statues");
    }

    static RoomWithFountain() {
        return new Room("Room with Fountain");
    }

    static OvergrownRoom() {
        return new Room("Overgrown Room");
    }

    static ReadingRoom() {
        return new Room("Reading Room");
    }

    static CartographyRoom() {
        return new Room("Cartography Room");
    }

    static Archives() {
        return new Room("Archives");
    }

    static ArtGallery() {
        return new Room("Art Gallery");
    }

    static Classroom() {
        return new Room("Classroom");
    }

    static TeacherOffice() {
        return new Room("Teacher's Office");
    }

    static Library() {
        return new Room("Library");
    }

    static Storage() {
        return new Room("Storage");
    }

    static Gymnasium() {
        return new Room("Gymnasium");
    }

    static Bathroom() {
        return new Room("Bathroom");
    }

    static DiningRoom() {
        return new Room("Dining Room");
    }

    static Kitchen() {
        return new Room("Kitchen");
    }

    static Armory() {
        return new Room("Armory");
    }

    static TortureChamber() {
        return new Room("Torture Chamber");
    }

    static TreasureRoom() {
        return new Room("Treasure Room");
    }

    static ThroneRoom() {
        return new Room("Throne Room");
    }
}