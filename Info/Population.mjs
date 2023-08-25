import {NumberGenerator} from "../Generators/NumberGenerator.mjs";

export class Population {
    static educationRate = 0.5;
    static literacyRate = Population.educationRate * 0.98;
    static mathematicsRate = Population.educationRate * 0.6;
    static researchRate = Population.educationRate * 0.2;
    static minPeople = 10;
    static maxPeople = 100;
    static population = NumberGenerator.random(Population.minPeople, Population.maxPeople);
    static populationGrowthRate = 0.01;
}