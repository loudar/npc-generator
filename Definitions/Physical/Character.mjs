import {Bodypart} from "./Bodypart.mjs";
import {Bodyparts} from "./Bodyparts.mjs";

export class Character {
    static new(name) {
        return {
            name: name,
            type: "Character",
            skills: [],
            getPossibleProfessions: function(professions) {
                let possibleProfessions = [];
                for (let prof of professions) {
                    for (let skill of prof.skills) {
                        if (this.skills.includes(skill)) {
                            possibleProfessions.push(prof);
                        }
                    }
                }
                return possibleProfessions;
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