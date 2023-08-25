import {Population} from "../Info/Population.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Professions} from "../Definitions/Professions.mjs";
import {MentalSkills} from "../Definitions/Skills/MentalSkills.mjs";

/**
 * Generates a background for a character.
 */
export class BackgroundGenerator {
    static generateBackground(character) {
        BackgroundGenerator.generateSkills(character);
        BackgroundGenerator.generateProfession(character);
    }

    static generateProfession(character) {
        const possibleProfessions = character.getPossibleProfessions(Professions.getAll());
        if (possibleProfessions.length > 0) {
            const profession = possibleProfessions[NumberGenerator.random(0, possibleProfessions.length - 1)];
            character.setProfession(profession);
        }
    }

    static generateSkills(character) {
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Literacy(), Population.literacyRate);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Mathematics(), Population.mathematicsRate);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Research(), Population.researchRate);
    }

    static learnSkillIfInRate(character, skill, rate) {
        const isAboveRate = NumberGenerator.random(0, 1) < rate;
        if (isAboveRate) {
            character.learnSkill(skill);
        }
    }
}
