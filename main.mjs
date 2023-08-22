import {Professions} from "./Definitions/Professions.mjs";
import {Character} from "./Definitions/Physical/Character.mjs";
import {Skills} from "./Definitions/Skills.mjs";
import * as fs from "fs";

console.log("Generating professions...");
const professionCategories = Professions.generate();
const professions = [];
for (let category of professionCategories) {
    for (let profession of category.professions) {
        professions.push(profession);
    }
}
console.log("Professions generated:", professions.length);

const char1 = Character.new("David");
const char2 = Character.new("Alex");

const result = char2.getBodypart("hands").act("break", `${char1.name} is {action}ing ${char2.name}' {object}!`);
console.log(result.sentence);

console.log(`Alex' hands are ${char2.getBodypart("hands").state}`);

let errors;
errors = char2.learnSkill(Skills.Literacy());
if (errors.length > 0) {
    console.log("Alex can't learn Literacy:");
    errors.forEach(error => console.log(" -> " + error));
}
errors = char2.learnSkill(Skills.Research());
if (errors.length > 0) {
    console.log("Alex can't learn Research:");
    errors.forEach(error => console.log(" -> " + error));
}
errors = char2.learnSkill(Skills.Mathematics());
if (errors.length > 0) {
    console.log("Alex can't learn Mathematics:");
    errors.forEach(error => console.log(" -> " + error));
}

const possibleProfessions = char2.getPossibleProfessions(professions);
console.log(`Alex' skills: ${char2.skills.map(skill => skill.name).join(", ")}`);
console.log(`Alex can be a ${possibleProfessions.map(prof => prof.name).join(", ")}`);