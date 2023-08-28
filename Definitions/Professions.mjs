import {ProfessionCategories} from "./ProfessionCategories.mjs";

export class Professions {
    static define() {
        return [
            ProfessionCategories.WOOD(),
            ProfessionCategories.METAL(),
            ProfessionCategories.LEATHER(),
            ProfessionCategories.SERVICE(),
            ProfessionCategories.FOOD(),
        ]
    }

    static getAll() {
        const professionCategories = Professions.define();
        const professions = [];
        for (let category of professionCategories) {
            for (let profession of category.professions) {
                professions.push(profession);
            }
        }
        return professions;
    }
}