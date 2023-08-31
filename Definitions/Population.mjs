import {NumberGenerator} from "../Generators/NumberGenerator.mjs";
import {LandGenerator} from "../Generators/LandGenerator.mjs";
import {LanguageGenerator} from "../Generators/LanguageGenerator.mjs";
import {CultureGenerator} from "../Generators/CultureGenerator.mjs";

export class Population {
    constructor() {
        const minPeople = 1000;
        const maxPeople = 10000;
        this.population = NumberGenerator.random(minPeople, maxPeople, true);
        this.populationGrowthRate = 0.01;
        this.educationRate = NumberGenerator.random(0.2, 0.95);
        return this;
    }
}