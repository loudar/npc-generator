import {Bodypart} from "./Bodypart.mjs";
import {Bodyparts} from "./Bodyparts.mjs";
import {Actions} from "./Actions.mjs";
import {States} from "./States.js";

export class Character {
    static new(name) {
        return {
            name: name,
            type: "Character",
            state: States.healthy,
            skills: [],
            getPossibleProfessions: function(professions) {
                let possibleProfessions = [];
                for (let prof of professions) {
                    for (let skill of prof.skills) {
                        for (let mySkill of this.skills) {
                            if (mySkill.name === skill.name) { // TODO: Add skill level check
                                possibleProfessions.push(prof);
                                break
                            }
                        }
                        if (possibleProfessions.includes(prof)) {
                            break;
                        }
                    }
                }
                return possibleProfessions;
            },
            learn: function(skill) {
                for (let mySkill of this.skills) {
                    if (mySkill.name === skill.name) {
                        return this;
                    }
                }
                if (skill.canBeLearned(this)) {
                    this.skills.push(skill);
                } else {
                    console.log(` -> Cannot learn ${skill.name}`);
                }
                return this;
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
                    .addSubpart(Bodypart.new("Mouth"))
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
    }
}