import {BuildingGenerator} from "../Generators/BuildingGenerator.mjs";
import {NumberGenerator} from "../Generators/NumberGenerator.mjs";

const educationRate = NumberGenerator.random(0.2, 0.95);
let buildings = [];
const count = 100;
for (let i = 0; i < count; i++) {
    buildings.push(BuildingGenerator.generateBuilding(educationRate));
}
const newBuildings = buildings.map(building => {
    const newBuilding = {...building};
    newBuilding.rooms = newBuilding.rooms.map(room => {
        return room.type;
    });
    return newBuilding;
})
console.log(newBuildings);