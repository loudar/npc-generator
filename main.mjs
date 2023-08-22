import {Professions} from "./Definitions/Professions.mjs";
import {Character} from "./Definitions/Physical/Character.mjs";
import {Skills} from "./Definitions/Skills.mjs";
import * as fs from "fs";
import {Actions} from "./Definitions/Physical/Actions.mjs";

console.log("Generating professions...");
const professionCategories = Professions.generate();
const professions = [];
for (let category of professionCategories) {
    for (let profession of category.professions) {
        professions.push(profession);
    }
}
console.log("Professions generated:", professions.length);

const language = "en";

const char1 = Character.new("David");
const char2 = Character.new("Alex");

const bodypart = char2.getBodypart("nose");
const result = bodypart.act("break");
if (result.action) {
    console.log(`${char1.name} ${result.action.verb[language]}s ${char2.name}' ${bodypart.name}.`);
} else if (result.error) {
    console.log(result.error);
} else {
    console.log(`Nothing happens.`);
}

console.log(`Alex' hands are ${char2.getBodypart("hands").state}`);

let learnRes, totalCost = 0;
learnRes = char2.learnSkill(Skills.Literacy());
if (learnRes.errors) {
    console.log("Alex can't learn Literacy:");
    learnRes.errors.forEach(error => console.log(" -> " + error));
} else {
    totalCost += learnRes.cost;
    console.log(`Alex learns Literacy for ${learnRes.cost} points.`);
}
learnRes = char2.learnSkill(Skills.Research());
if (learnRes.errors) {
    console.log("Alex can't learn Research:");
    learnRes.errors.forEach(error => console.log(" -> " + error));
} else {
    totalCost += learnRes.cost;
    console.log(`Alex learns Research for ${learnRes.cost} points.`);
}
learnRes = char2.learnSkill(Skills.Mathematics());
if (learnRes.errors) {
    console.log("Alex can't learn Mathematics:");
    learnRes.errors.forEach(error => console.log(" -> " + error));
} else {
    totalCost += learnRes.cost;
    console.log(`Alex learns Mathematics for ${learnRes.cost} points.`);
}

const possibleProfessions = char2.getPossibleProfessions(professions);
console.log(`Alex' skills: ${char2.skills.map(skill => skill.name).join(", ")}`);
console.log(`Alex can be a ${possibleProfessions.map(prof => prof.name).join(", ")}`);