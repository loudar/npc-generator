import {Population} from "../Info/Population.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";
import {Professions} from "../Definitions/Professions.mjs";
import {MentalSkills} from "../Definitions/Skills/MentalSkills.mjs";
import {PhysicalSkills} from "../Definitions/Skills/PhysicalSkills.mjs";

/**
 * Generates a background for a character.
 */
export class BackgroundGenerator {
    /**
     *
     * @param character {Character}
     * @param population {Population}
     */
    static generateBackground(character, population) {
        BackgroundGenerator.generateSkills(character, population);
        BackgroundGenerator.generateProfession(character, population);
    }

    static generateProfession(character, population) {
        const possibleProfessions = character.getPossibleProfessions(Professions.getAll());
        if (possibleProfessions.length > 0) {
            const profession = possibleProfessions[NumberGenerator.random(0, possibleProfessions.length - 1, true)];
            character.setProfession(profession);
        }
    }

    static generateSkills(character, population) {
        const educationRate = population.educationRate;
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Speaking(), 0.999);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Listening(), 0.999);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Literacy(), educationRate * 0.98);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Mathematics(), educationRate * 0.5);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Research(), educationRate * 0.2);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Logic(), educationRate * 0.75);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Medicine(), educationRate * 0.1);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Understanding(), educationRate * 0.5);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Engineering(), educationRate * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Finance(), educationRate * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Cartography(), educationRate * 0.025);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Belief(), (1 - educationRate) * 0.95);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Drawing(), educationRate * 0.2);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Farming(), (1 - educationRate) * 1.5);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Hunting(), (1 - educationRate) * 0.2);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Cooking(), educationRate * 0.3);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Beekeeping(), educationRate * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Carpentry(), (1 - educationRate) * 0.4);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Cutting(), (1 - educationRate) * 0.95);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Mining(), (1 - educationRate) * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Smithing(), (1 - educationRate) * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Tailoring(), (1 - educationRate) * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, PhysicalSkills.Gardening(), (1 - educationRate) * 0.3);
        BackgroundGenerator.learnSkillIfInRate(character, MentalSkills.Authority(), (1 - educationRate) * 0.65);
    }

    static learnSkillIfInRate(character, skill, rate) {
        const isAboveRate = NumberGenerator.random(0, 1) < rate;
        if (isAboveRate) {
            character.learnSkill(skill);
        }
    }
}
