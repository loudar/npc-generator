import {Condition} from "./Condition.mjs";

export class Conditions {
    static Arm() {
        return Condition.new("Arm")
            .addCheck((character, obj) => character.body.has("Arm"));
    }

    static Hand() {
        return Condition.new("Hand")
            .addSubcondition(Conditions.Arm())
            .addCheck((character, obj) => character.body.has("Hand"));
    }

    static Eye() {
        return Condition.new("Eye")
            .addCheck((character, obj) => character.body.has("Eye"));
    }

    static HealthyObject() {
        return Condition.new("HealthyObject")
            .addCheck((character, obj) => obj.state === "Healthy");
    }

    static HealthyCharacter() {
        return Condition.new("HealthyCharacter")
            .addCheck((character, obj) => character.state === "Healthy");
    }
}