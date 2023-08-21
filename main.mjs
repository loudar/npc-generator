import {Professions} from "./Definitions/Professions.mjs";
import {Character} from "./Definitions/Physical/Character.mjs";
import {Skills} from "./Definitions/Skills.mjs";

console.log("Generating professions...");
const professions = Professions.generate();
console.log("Professions generated.");

const alex = Character.new("Alex");
// break alex's hands so he can't learn Research
alex.getBodypart("Hands").setState("Broken");

const canLearnResearch = Skills.Research().canBeLearned(alex);
const canLearnReading = Skills.Read().canBeLearned(alex);

console.log(`Alex can learn Research: ${canLearnResearch}`);
console.log(`Alex can learn Reading: ${canLearnReading}`);