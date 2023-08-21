import {Bodypart} from "./Bodypart.mjs";
import {Action} from "./Action.js";
import {Conditions} from "../Conditions.mjs";

export class Bodyparts {
    static Bones() {
        return Bodypart.new("Bones")
            .addAction(Action.new("break")
                .set((character, object) => {
                    object.setState("broken");
                })
                .addCondition(Conditions.HealthyObject())
            )
    }
}