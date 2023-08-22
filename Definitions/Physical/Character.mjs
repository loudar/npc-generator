import {Bodypart} from "./Bodypart.mjs";
import {Bodyparts} from "./Bodyparts.mjs";
import {Actions} from "./Actions.mjs";
import {States} from "./States.js";
import {ObjectFactory} from "../Extensions/ObjectFactory.mjs";

export class Character {
    static new(name) {
        let baseObject = {
            name: name,
            type: "Character",
            state: States.healthy,
            properties: [],
            addProperty: function(property) {
                this.properties.push(property);
                return this;
            },
            skills: [],
            getPossibleProfessions: function(professions) {
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
            },
            /**
             * Returns errors if the skill can't be learned, otherwise returns the cost to learn the skill and required subskills.
             * @param skill
             * @returns {{errors: ([string]|string[]|[])}|{cost: number}}
             */
            learnSkill: function(skill) {
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
            },
            getBodypart: function(bodypartName) {
                return this.body.getBodypart(bodypartName);
            },
            body: Bodypart.new("Body")
                .addSubpart(Bodypart.new("Head")
                    .addSubpart(Bodypart.new("Face"))
                    .addSubpart(Bodypart.new("Eyes"))
                    .addSubpart(Bodypart.new("Ears"))
                    .addSubpart(Bodypart.new("Nose")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Mouth")
                        .addSubpart(Bodypart.new("Tongue"))
                        .addSubpart(Bodypart.new("Teeth")))
                    .addSubpart(Bodypart.new("Hair"))
                    .addSubpart(Bodypart.new("Neck")
                        .addSubpart(Bodyparts.Bones())))
                .addSubpart(Bodypart.new("Torso")
                    .addSubpart(Bodypart.new("Chest")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Back")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Abdomen"))
                    .addSubpart(Bodypart.new("Pelvis")))
                .addSubpart(Bodypart.new("Arms")
                    .addSubpart(Bodypart.new("Shoulders")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Upper Arms")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Elbows")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Forearms")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Wrists")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Hands")
                        .addAction(Actions.BreakObject())
                        .addSubpart(Bodyparts.Bones())))
                .addSubpart(Bodypart.new("Legs")
                    .addSubpart(Bodypart.new("Hips")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Thighs"))
                    .addSubpart(Bodypart.new("Knees")
                        .addSubpart(Bodyparts.Bones()))
                    .addSubpart(Bodypart.new("Calves"))
                    .addSubpart(Bodypart.new("Ankles"))
                    .addSubpart(Bodypart.new("Feet")
                        .addSubpart(Bodyparts.Bones())))
                .addSubpart(Bodypart.new("Organs")
                    .addSubpart(Bodypart.new("Heart"))
                    .addSubpart(Bodypart.new("Lungs"))
                    .addSubpart(Bodypart.new("Liver"))
                    .addSubpart(Bodypart.new("Stomach"))
                    .addSubpart(Bodypart.new("Intestines"))
                    .addSubpart(Bodypart.new("Kidneys"))
                    .addSubpart(Bodypart.new("Bladder"))
                    .addSubpart(Bodypart.new("Reproductive Organs")))
        };
        return ObjectFactory.addActions(baseObject);
    }
}