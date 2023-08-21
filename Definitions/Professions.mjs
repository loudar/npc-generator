import {ProfessionCategories} from "./ProfessionCategories.mjs";

export class Professions {
    static generate() {
        return [
            ProfessionCategories.WOOD(),
            ProfessionCategories.METAL(),
            ProfessionCategories.LEATHER(),
            ProfessionCategories.SERVICE(),
            ProfessionCategories.FOOD(),
        ]
    }
}