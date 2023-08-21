import {Condition} from "./Condition.mjs";

export class Conditions {
    static Arms() {
        return Condition.new("Arms")
            .addCheck((character, obj) => character.body.has("arms"));
    }

    static Hands() {
        return Condition.new("Hands")
            .addSubcondition(Conditions.Arms())
            .addCheck((character, obj) => character.body.has("hands"));
    }

    static Eyes() {
        return Condition.new("Eyes")
            .addCheck((character, obj) => character.body.has("eyes"));
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