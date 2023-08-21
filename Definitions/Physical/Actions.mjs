import {Conditions} from "../Conditions.mjs";
import {Action} from "./Action.mjs";

export class Actions {
    static BreakObject() {
        return Action.new("break")
            .set((object) => {
                object.setState("broken");
            })
            .addCondition(Conditions.Healthy())
    }
}