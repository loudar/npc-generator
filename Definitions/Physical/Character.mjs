import {Bodypart} from "./Bodypart.mjs";
import {Bodyparts} from "./Bodyparts.mjs";
import {Actions} from "./Actions.mjs";
import {States} from "./States.mjs";
import {Professions} from "../Professions.mjs";
import {Actionable} from "../Extensions/Actionable.mjs";
import {PropertyStore} from "../Extensions/PropertyStore.mjs";

export class Character extends Actionable(PropertyStore) {
    constructor(name) {
        super();
        this.name = name;
        this.type = "Character";
        this.state = States.healthy;
        this.skills = [];
        this.profession = 'Nitwit';
        return this;
    }

    buildBody() {
        this.body = new Bodypart("Body")
            .addSubpart(new Bodypart("Head")
                .addSubpart(new Bodypart("Face"))
                .addSubpart(new Bodypart("Eyes"))
                .addSubpart(new Bodypart("Ears"))
                .addSubpart(new Bodypart("Nose")
                    .addAction(Actions.BreakObject())
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Mouth")
                    .addSubpart(new Bodypart("Tongue"))
                    .addSubpart(new Bodypart("Teeth")))
                .addSubpart(new Bodypart("Hair"))
                .addSubpart(new Bodypart("Neck")
                    .addSubpart(Bodyparts.Bones())))
            .addSubpart(new Bodypart("Torso")
                .addSubpart(new Bodypart("Chest")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Back")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Abdomen"))
                .addSubpart(new Bodypart("Pelvis")))
            .addSubpart(new Bodypart("Arms")
                .addSubpart(new Bodypart("Shoulders")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Upper Arms")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Elbows")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Forearms")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Wrists")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Hands")
                    .addAction(Actions.BreakObject())
                    .addSubpart(Bodyparts.Bones())))
            .addSubpart(new Bodypart("Legs")
                .addSubpart(new Bodypart("Hips")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Thighs"))
                .addSubpart(new Bodypart("Knees")
                    .addSubpart(Bodyparts.Bones()))
                .addSubpart(new Bodypart("Calves"))
                .addSubpart(new Bodypart("Ankles"))
                .addSubpart(new Bodypart("Feet")
                    .addSubpart(Bodyparts.Bones())))
            .addSubpart(new Bodypart("Organs")
                .addSubpart(new Bodypart("Heart"))
                .addSubpart(new Bodypart("Lungs"))
                .addSubpart(new Bodypart("Liver"))
                .addSubpart(new Bodypart("Stomach"))
                .addSubpart(new Bodypart("Intestines"))
                .addSubpart(new Bodypart("Kidneys"))
                .addSubpart(new Bodypart("Bladder"))
                .addSubpart(new Bodypart("Reproductive Organs"))
            );
    }

    getPossibleProfessions(professions) {
        let possibleProfessions = [];
        for (let prof of professions) {
            let canBe = true;
            for (let skill of prof.skills) {
                let existingSkill = this.skills.find(mySkill => mySkill.name === skill.name);
                if (!existingSkill && skill.required) {
                    canBe = false;
                    break;
                }
            }
            if (canBe) {
                possibleProfessions.push(prof);
            }
        }
        return possibleProfessions;
    }
    
    setProfession(profession) {
        const possibleProfessions = this.getPossibleProfessions(Professions.getAll()).map(prof => prof.name);
        if (!possibleProfessions.includes(profession.name)) {
            console.log({
                possibleProfessions,
                skills: this.skills
            });
            throw new Error(`${this.name} can't be a ${profession.name}`);
        }
        this.profession = profession.name;
        return this;
    }
    
    /**
     * Returns errors if the skill can't be learned, otherwise returns the cost to learn the skill and required subskills.
     * @param skill
     * @returns {{errors: ([string]|string[]|[])}|{cost: number}}
     */
    learnSkill(skill) {
        let cost = 0;
        for (let mySkill of this.skills) {
            if (mySkill.name === skill.name) {
                return { cost };
            }
        }
        let errors = skill.canBeLearned(this);
        if (errors.length === 0) {
            for (let subskill of skill.subskills) {
                if (!subskill.required) {
                    continue;
                }
                const subLearn = this.learnSkill(subskill);
                if (subLearn.errors) {
                    errors.push(...subLearn.errors);
                } else {
                    cost += subLearn.cost;
                }
            }
            this.skills.push(skill);
            cost += skill.cost;
        } else {
            return { errors };
        }
        return { cost };
    }
    
    getBodypart(bodypartName) {
        return this.body.getBodypart(bodypartName);
    }
}