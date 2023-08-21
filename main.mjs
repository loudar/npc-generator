import {Professions} from "./Definitions/Professions.mjs";
import {Character} from "./Definitions/Physical/Character.mjs";
import {Skills} from "./Definitions/Skills.mjs";
import * as fs from "fs";
import {Skill} from "./Definitions/Skill.mjs";

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

const canLearnResearch1 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch1}`);

alex.getBodypart("hands").getAvailableActions().forEach(action => {
    console.log(`Alex' hands can ${action.name}`);
});

//alex.getBodypart("hands").act("break");
console.log(`Alex' hands are ${alex.getBodypart("hands").state}`);

const canLearnResearch2 = Skills.Research().canBeLearned(alex);
console.log(`Alex can learn Research: ${canLearnResearch2}`);

alex.learn(Skills.Distilling());
alex.learn(Skills.Brewing());

const possibleProfessions = alex.getPossibleProfessions(professions);
console.log(`Alex' skills: ${alex.skills.map(skill => skill.name).join(", ")}`);
console.log(`Alex can be a ${possibleProfessions.map(prof => prof.name).join(", ")}`);