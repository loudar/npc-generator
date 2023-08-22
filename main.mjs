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

const alex = Character.new("Alex");
// write alex to file
fs.writeFileSync("./alex.json", JSON.stringify(alex, null, 4));

alex.getBodypart("hands").getAvailableActions().forEach(action => {
    console.log(`Alex' hands can ${action.name}`);
});

const result = alex.getBodypart("hands").act("break", `We're {action}ing ${alex.name} {object}!`);
console.log(result.sentence);
console.log(`Alex' hands are ${alex.getBodypart("hands").state}`);

let errors;
errors = alex.learnSkill(Skills.Literacy());
if (errors.length > 0) {
    console.log("Alex can't learn Literacy:");
    errors.forEach(error => console.log(" -> " + error));
}
errors = alex.learnSkill(Skills.Research());
if (errors.length > 0) {
    console.log("Alex can't learn Research:");
    errors.forEach(error => console.log(" -> " + error));
}
errors = alex.learnSkill(Skills.Mathematics());
if (errors.length > 0) {
    console.log("Alex can't learn Mathematics:");
    errors.forEach(error => console.log(" -> " + error));
}

const possibleProfessions = alex.getPossibleProfessions(professions);
console.log(`Alex' skills: ${alex.skills.map(skill => skill.name).join(", ")}`);
console.log(`Alex can be a ${possibleProfessions.map(prof => prof.name).join(", ")}`);