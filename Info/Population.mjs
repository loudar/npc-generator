import {NumberGenerator} from "../Generators/NumberGenerator.mjs";
import {LandGenerator} from "../Generators/LandGenerator.mjs";

export class Population {
    static new() {
        const minPeople = 1000;
        const maxPeople = 10000;
        this.population = NumberGenerator.random(minPeople, maxPeople, true);
        this.populationGrowthRate = 0.01;
        this.educationRate = NumberGenerator.random(0.2, 0.95);
        this.land = LandGenerator.generateLand();
        return this;
    }
}