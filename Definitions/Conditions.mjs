import {Condition} from "./Condition.mjs";
import {States} from "./Physical/States.js";
import {Checks} from "./Checks.js";

export class Conditions {
    static Arms() {
        return Condition.new("Arms")
            .addCheck((character, obj) => Checks.bodyPartState(character, "arms", States.healthy));
    }

    static Hands() {
        return Condition.new("Hands")
            .addSubcondition(Conditions.Arms())
            .addCheck((character, obj) => Checks.bodyPartState(character, "hands", States.healthy));
    }

    static Eyes() {
        return Condition.new("Eyes")
            .addCheck((character, obj) => Checks.bodyPartState(character, "eyes", States.healthy));
    }

    static HealthyObject() {
        return Condition.new("HealthyObject")
            .addCheck((character, obj) => obj.state === States.healthy);
    }

    static HealthyCharacter() {
        return Condition.new("HealthyCharacter")
            .addCheck((character, obj) => character.state === States.healthy);
    }
}