import {Professions} from "./Definitions/Professions.mjs";
import {Character} from "./Definitions/Physical/Character.mjs";
import {Skills} from "./Definitions/Skills.mjs";
import * as fs from "fs";

console.log("Generating professions...");
const professions = Professions.generate();
console.log("Professions generated.");

const alex = Character.new("Alex");
// write alex to file
fs.writeFileSync("./alex.json", JSON.stringify(alex, null, 4));

const canLearnResearch1 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch1}`);

console.log("Here's what ya can do to Alex's hands...");
alex.getBodypart("hands").getAvailableActions().forEach(action => console.log(action.name));
console.log("");
// break alex's hands so he can't learn Research
console.log("Breaking Alex's hands...");
alex.getBodypart("hands").act("break");
console.log("");
const canLearnResearch2 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch2}`);
console.log("");
console.log("Here's what ya can do now to Alex's hands...");
alex.getBodypart("hands").getAvailableActions().forEach(action => console.log(action.name));