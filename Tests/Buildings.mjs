import {BuildingGenerator} from "../Generators/BuildingGenerator.mjs";
import {NumberGenerator} from "../Generators/NumberGenerator.mjs";
import {MapTile} from "../Definitions/MapTile.mjs";

const educationRate = NumberGenerator.random(0.2, 0.95, null);
let buildings = [];
const count = 100;
for (let i = 0; i < count; i++) {
    buildings.push(BuildingGenerator.generateBuilding(new MapTile(0, 0, "valley"), educationRate));
}
const newBuildings = buildings.map(building => {
    const newBuilding = {...building};
    newBuilding.rooms = newBuilding.rooms.map(room => {
        return room.type;
    });
    return newBuilding;
})
console.log(newBuildings);