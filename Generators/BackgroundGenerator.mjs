import {Population} from "../Definitions/Population.mjs";
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
    static generateBackground(character, population, seed) {
        BackgroundGenerator.generateSkills(character, population, seed);
        BackgroundGenerator.generateProfession(character, population, seed);
    }

    static generateProfession(character, population, seed) {
        const possibleProfessions = character.getPossibleProfessions(Professions.getAll());
        if (possibleProfessions.length > 0) {
            const profession = possibleProfessions[NumberGenerator.random(0, possibleProfessions.length, seed, true)];
            character.setProfession(profession);
        }
    }

    static generateSkills(character, population, seed) {
        const educationRate = population.educationRate;
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Speaking(), 0.999);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Listening(), 0.999);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Literacy(), educationRate * 0.98);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Mathematics(), educationRate * 0.5);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Research(), educationRate * 0.2);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Logic(), educationRate * 0.75);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Medicine(), educationRate * 0.1);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Understanding(), educationRate * 0.5);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Engineering(), educationRate * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Finance(), educationRate * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Cartography(), educationRate * 0.025);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Belief(), (1 - educationRate) * 0.95);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Drawing(), educationRate * 0.2);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Farming(), (1 - educationRate) * 1.5);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Hunting(), (1 - educationRate) * 0.2);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Cooking(), educationRate * 0.3);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Beekeeping(), educationRate * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Carpentry(), (1 - educationRate) * 0.4);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Cutting(), (1 - educationRate) * 0.95);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Mining(), (1 - educationRate) * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Smithing(), (1 - educationRate) * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Tailoring(), (1 - educationRate) * 0.05);
        BackgroundGenerator.learnSkillIfInRate(character, seed, PhysicalSkills.Gardening(), (1 - educationRate) * 0.3);
        BackgroundGenerator.learnSkillIfInRate(character, seed, MentalSkills.Authority(), (1 - educationRate) * 0.65);
    }

    static learnSkillIfInRate(character, seed, skill, rate) {
        const isAboveRate = NumberGenerator.random(0, 1, seed) < rate;
        if (isAboveRate) {
            character.learnSkill(skill);
        }
    }
}
