import {Condition} from "./Condition.mjs";

export class Conditions {
    static Arm() {
        return Condition.new("Arm")
            .addCheck(character => character.body.has("Arm"));
    }

    static Hand() {
        return Condition.new("Hand")
            .addSubcondition(Conditions.Arm())
            .addCheck(character => character.body.has("Hand"));
    }

    static Eye() {
        return Condition.new("Eye")
            .addCheck(character => character.body.has("Eye"));
    }
}