import {NumberGenerator} from "../Generators/NumberGenerator.mjs";

export class Population {
    static new() {
        const minPeople = 1000;
        const maxPeople = 10000;
        this.population = NumberGenerator.random(minPeople, maxPeople, true);
        this.populationGrowthRate = 0.01;
        this.educationRate = NumberGenerator.random(0.4, 0.95);
        return this;
    }
}