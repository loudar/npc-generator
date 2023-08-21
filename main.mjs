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

alex.getBodypart("hands").getAvailableActions().forEach(action => {
    console.log(`Alex' hands can ${action.name}`);
});

alex.getBodypart("hands").act("break");
console.log(`Alex' hands are ${alex.getBodypart("hands").state}`);

const canLearnResearch2 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch2}`);