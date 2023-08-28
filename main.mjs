import {Professions} from "./Definitions/Professions.mjs";
import {PopulationGenerator} from "./Generators/PopulationGenerator.mjs";
import {Numbers} from "./Helpers/Numbers.mjs";

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

console.log("Generating population...");
const startTime = new Date();
const population = PopulationGenerator.generatePopulation();
const endTime = new Date();
const diffSeconds = (endTime - startTime) / 1000;
const formattedDiff = diffSeconds < 1 ? diffSeconds * 1000 + "ms" : diffSeconds + "s";
console.log("Population generated: " + population.people.length + " people in " + formattedDiff);
console.log("Education rate: " + Numbers.toPercent(population.info.educationRate));

const professionCounts = population.people.reduce((counts, person) => {
    if (!counts[person.profession]) {
        counts[person.profession] = { count: 0 };
    }
    counts[person.profession].count++;
    return counts;
}, {});

console.log("Profession counts:", professionCounts);

/*
const bodypart = char2.getBodypart("nose");
const result = bodypart.act("break");
if (result.action) {
    console.log(`${char1.name} ${result.action.verb[language]}s ${char2.name}${char2.name.endsWith('s') || char2.name.endsWith('z') ? "'" : "'s"} ${bodypart.name}.`);
} else if (result.error) {
    console.log(result.error);
} else {
    console.log(`Nothing happens.`);
}

console.log(`${char2.name}${char2.name.endsWith('s') || char2.name.endsWith('z') ? "'" : "'s"} hands are ${char2.getBodypart("hands").state}`);

let learnRes, totalCost = 0;
learnRes = char2.learnSkill(Skills.Literacy());
if (learnRes.errors) {
    console.log(`${char2.name} can't learn Literacy:`);
    learnRes.errors.forEach(error => console.log(" -> " + error));
} else {
    totalCost += learnRes.cost;
    console.log(`${char2.name} learns Literacy for ${learnRes.cost} points.`);
}
learnRes = char2.learnSkill(Skills.Research());
if (learnRes.errors) {
    console.log(`${char2.name} can't learn Research:`);
    learnRes.errors.forEach(error => console.log(" -> " + error));
} else {
    totalCost += learnRes.cost;
    console.log(`${char2.name} learns Research for ${learnRes.cost} points.`);
}
learnRes = char2.learnSkill(Skills.Mathematics());
if (learnRes.errors) {
    console.log(`${char2.name} can't learn Mathematics:`);
    learnRes.errors.forEach(error => console.log(" -> " + error));
} else {
    totalCost += learnRes.cost;
    console.log(`${char2.name} learns Mathematics for ${learnRes.cost} points.`);
}

console.log(`Total cost: ${totalCost} points`);

const possibleProfessions = char2.getPossibleProfessions(professions);
console.log(`${char2.name}${char2.name.endsWith('s') || char2.name.endsWith('z') ? "'" : "'s"} skills: ${char2.skills.map(skill => skill.name).join(", ")}`);
console.log(`${char2.name} can be a ${possibleProfessions.map(prof => prof.name).join(", ")}`);
*/