import {LandGenerator} from "../Generators/LandGenerator.mjs";

process.chdir("..");
const terrainCount = 100;
const terrains = LandGenerator.generateTerrains(terrainCount);
console.log(terrains);
