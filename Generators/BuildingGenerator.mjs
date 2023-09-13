import {Building} from "../Definitions/Building.mjs";
import {DistributionSolver} from "./DistributionSolver.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Rooms} from "../Definitions/Rooms.mjs";
import {Maps} from "../Helpers/Maps.mjs";

export class BuildingGenerator {
    static generateBuilding(educationRate, seed) {
        const buildingSize = NumberGenerator.randomWithBias(1, 3, seed, 1, 0.5);
        const building = new Building(this.generateBuildingType(educationRate), buildingSize);
        const rooms = this.generateRooms(building, buildingSize, seed);
        building.addRooms(rooms);
        return building;
    }

    static generateBuildingType(educationRate) {
        const distribution = this.generateBuildingTypeDistribution(educationRate);
        return DistributionSolver.chooseKeyByDistribution(distribution);
    }

    static generateRooms(building, buildingSize = 1, seed) {
        const roomInfo = this.generateRoomDistribution(building.type, building.educationRate);
        const optionalRoomCount = NumberGenerator.random(0, Object.keys(roomInfo.optional).length * buildingSize, seed, true);
        let optionalRooms = [];
        const optionalDistribution = Maps.transformMap(roomInfo.optional, "type");
        while (optionalRooms.length < optionalRoomCount) {
            const roomType = DistributionSolver.chooseKeyByDistribution(optionalDistribution);
            const room = Maps.findKeyWithPropertyValue(roomInfo.optional, "type", roomType);
            optionalRooms.push(room);
        }
        const requiredRooms = Maps.getKeys(roomInfo.required);
        const requiredAdditionalDistribution = Maps.transformMap(roomInfo.required, "type");
        const allRequiredRooms = [...requiredRooms];
        if (buildingSize > 1.1) {
            while (allRequiredRooms.length < Math.floor(buildingSize * requiredRooms.length)) {
                const roomType = DistributionSolver.chooseKeyByDistribution(requiredAdditionalDistribution);
                const room = Maps.findKeyWithPropertyValue(roomInfo.required, "type", roomType);
                allRequiredRooms.push(room);
            }
        }
        return [...allRequiredRooms, ...optionalRooms];
    }

    static generateBuildingTypeDistribution(educationRate) {
        return {
            "House": 0.5,
            "Shop": 0.3,
            "Tavern": 0.1,
            "Inn": 0.1,
            "Temple": 0.01,
            "Library": 0.05 * educationRate,
            "School": 0.1 * educationRate,
            "Barracks": 0.01,
            "Fortress": 0.01,
            "Castle": 0.01,
            "Palace": 0.01,
            "Guild": 0.01,
            "Bank": 0.01,
            "Theater": 0.01 * educationRate,
        }
    }

    static generateRoomDistribution(buildingType, educationRate) {
        switch (buildingType) {
            case "House":
                return {
                    required: new Map([
                        [Rooms.Bedroom(), 2],
                        [Rooms.Kitchen(), 0.05],
                        [Rooms.Bathroom(), 1],
                        [Rooms.LivingRoom(), 0.25],
                    ]),
                    optional: new Map([
                        [Rooms.Study(), 0.5 * educationRate],
                        [Rooms.DiningRoom(), 0.5 * educationRate],
                        [Rooms.Library(), 0.05 * educationRate],
                        [Rooms.Laboratory(), 0.05 * educationRate],
                        [Rooms.Workshop(), 0.5 * (1 - educationRate)],
                    ])
                }
            case "Shop":
                return {
                    required: new Map([
                        [Rooms.ShopFloor(), 1],
                        [Rooms.Storage(), 1],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                        [Rooms.Workshop(), 0.5 * (1 - educationRate)],
                    ])
                }
            case "Tavern":
                return {
                    required: new Map([
                        [Rooms.Bar(), 1],
                        [Rooms.Kitchen(), 1],
                        [Rooms.DiningRoom(), 1],
                        [Rooms.Storage(), 2],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                    ])
                }
            case "Inn":
                return {
                    required: new Map([
                         [Rooms.Bar(), 1],
                         [Rooms.Kitchen(), 1],
                         [Rooms.DiningRoom(), 1],
                         [Rooms.Storage(), 1],
                         [Rooms.Bedroom(), 20],
                         [Rooms.Bathroom(), 5],
                         [Rooms.LivingRoom(), 0.3],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                    ])
                }
            case "Temple":
                return {
                    required: new Map([
                        [Rooms.Hallway(), 1],
                    ]),
                    optional: new Map([
                        [Rooms.Hall(), 0.2],
                        [Rooms.TreasureRoom(), 0.9],
                        [Rooms.Shrine(), 0.2],
                        [Rooms.SacrificialChamber(), 0.1],
                        [Rooms.Library(), 0.05],
                        [Rooms.Laboratory(), 0.05],
                        [Rooms.Gallery(), 0.05],
                        [Rooms.TrapRoom(), 0.05],
                        [Rooms.RoomWithBridge(), 0.05],
                        [Rooms.RoomWithPit(), 0.05],
                        [Rooms.RoomWithPillars(), 0.05],
                        [Rooms.RoomWithWater(), 0.05],
                        [Rooms.RoomWithLava(), 0.05],
                        [Rooms.RoomWithStatues(), 0.05],
                        [Rooms.RoomWithFountain(), 0.05],
                        [Rooms.OvergrownRoom(), 0.05],
                    ])
                }
            case "Library":
                return {
                    required: new Map([
                        [Rooms.ReadingRoom(), 2],
                        [Rooms.Storage(), 0.5],
                        [Rooms.Office(), 0.5],
                    ]),
                    optional: new Map([
                        [Rooms.Bathroom(), 0.9],
                        [Rooms.CartographyRoom(), 0.1],
                        [Rooms.Archives(), 0.7],
                        [Rooms.ArtGallery(), 0.1],
                    ])
                }
            case "School":
                return {
                    required: new Map([
                        [Rooms.Classroom(), 20],
                        [Rooms.TeacherOffice(), 1],
                        [Rooms.Library(), 1],
                        [Rooms.Storage(), 2],
                        [Rooms.Gymnasium(), 1],
                        [Rooms.Bathroom(), 2],
                        [Rooms.DiningRoom(), 1],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), educationRate],
                        [Rooms.Kitchen(), 0.7],
                    ])
                }
            case "Barracks":
                return {
                    required: new Map([
                        [Rooms.Bedroom(), 10],
                        [Rooms.Bathroom(), 2],
                        [Rooms.DiningRoom(), 1],
                        [Rooms.Storage(), 1],
                        [Rooms.Gymnasium(), 1],
                        [Rooms.Armory(), 1],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                        [Rooms.Kitchen(), 0.7],
                    ])
                }
            case "Fortress":
                return {
                    required: new Map([
                        [Rooms.Bedroom(), 20],
                        [Rooms.Bathroom(), 2],
                        [Rooms.DiningRoom(), 2],
                        [Rooms.Storage(), 1],
                        [Rooms.Kitchen(), 1],
                        [Rooms.Armory(), 1],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                        [Rooms.Gymnasium(), 0.5],
                        [Rooms.TortureChamber(), 0.7]
                    ])
                }
            case "Castle":
                return {
                    required: new Map([
                        [Rooms.Bedroom(), 20],
                        [Rooms.Bathroom(), 4],
                        [Rooms.DiningRoom(), 3],
                        [Rooms.Storage(), 2],
                        [Rooms.Kitchen(), 1],
                        [Rooms.Armory(), 1],
                        [Rooms.TortureChamber(), 1],
                        [Rooms.TreasureRoom(), 0.2],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                        [Rooms.Gymnasium(), 0.5],
                        [Rooms.ThroneRoom(), 0.05],
                    ])
                }
            case "Palace":
                return {
                    required: new Map([
                        [Rooms.Bedroom(), 20],
                        [Rooms.Bathroom(), 4],
                        [Rooms.DiningRoom(), 3],
                        [Rooms.Storage(), 2],
                        [Rooms.Kitchen(), 1],
                        [Rooms.Armory(), 1],
                        [Rooms.TortureChamber(), 1],
                        [Rooms.TreasureRoom(), 0.2],
                        [Rooms.ThroneRoom(), 0.1],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.9 * educationRate],
                        [Rooms.Gymnasium(), 0.5],
                        [Rooms.Laboratory(), 0.1],
                        [Rooms.Library(), 0.05],
                    ])
                }
            case "Guild":
                return {
                    required: new Map([
                        [Rooms.Bedroom(), 10],
                        [Rooms.Bathroom(), 2],
                        [Rooms.DiningRoom(), 1],
                        [Rooms.Storage(), 1],
                        [Rooms.Kitchen(), 1],
                        [Rooms.Armory(), 1],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.5 * educationRate],
                        [Rooms.Gymnasium(), 0.5],
                    ])
                }
            case "Bank":
                return {
                    required: new Map([
                        [Rooms.Bathroom(), 2],
                        [Rooms.DiningRoom(), 1],
                        [Rooms.Storage(), 1],
                        [Rooms.Kitchen(), 1],
                        [Rooms.TreasureRoom(), 1],
                        [Rooms.Hallway(), 1],
                        [Rooms.Hall(), 0.2],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.9 * educationRate],
                        [Rooms.Gymnasium(), 0.5],
                    ])
                }
            case "Theater":
                return {
                    required: new Map([
                        [Rooms.Stage(), 1],
                        [Rooms.DressingRoom(), 1],
                        [Rooms.Storage(), 1],
                        [Rooms.Bathroom(), 2],
                        [Rooms.DiningRoom(), 1],
                        [Rooms.Kitchen(), 1],
                        [Rooms.Hallway(), 1],
                        [Rooms.Hall(), 0.2],
                    ]),
                    optional: new Map([
                        [Rooms.Office(), 0.9 * educationRate],
                    ])
                }
        }
    }
}