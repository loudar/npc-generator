import {NumberGenerator} from "../Generators/NumberGenerator.mjs";
import {LandGenerator} from "../Generators/LandGenerator.mjs";
import {LanguageGenerator} from "../Generators/LanguageGenerator.mjs";

export class Population {
    static new() {
        const minPeople = 1000;
        const maxPeople = 10000;
        this.population = NumberGenerator.random(minPeople, maxPeople, true);
        this.populationGrowthRate = 0.01;
        this.educationRate = NumberGenerator.random(0.2, 0.95);
        this.land = LandGenerator.generateLand();
        this.language = LanguageGenerator.generateLanguage();
        return {
            population: this.population,
            populationGrowthRate: this.populationGrowthRate,
            educationRate: this.educationRate,
            land: this.land,
            language: this.language
        };
    }
}