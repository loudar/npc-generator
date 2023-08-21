import {Professions} from "./Definitions/Professions.mjs";
import {Character} from "./Definitions/Physical/Character.mjs";
import {Skills} from "./Definitions/Skills.mjs";

console.log("Generating professions...");
const professions = Professions.generate();
console.log("Professions generated.");

const alex = Character.new("Alex");

const canLearnResearch1 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch1}`);

// break alex's hands so he can't learn Research
console.log("Breaking Alex's hands...");
alex.getBodypart("hands").act("break", alex);

const canLearnResearch2 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch2}`);