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
const population = PopulationGenerator.generatePopulation();
console.log("Population generated: " + population.people.length + " people in " + population.generation.time);
console.log("Education rate: " + Numbers.toPercent(population.info.educationRate));

const professionCounts = population.people.reduce((counts, person) => {
    if (!counts[person.profession]) {
        counts[person.profession] = { count: 0 };
    }
    counts[person.profession].count++;
    return counts;
}, {});

console.log("Profession counts:", professionCounts);