import {Condition} from "./Condition.mjs";
import {States} from "./Physical/States.js";
import {Checks} from "./Checks.js";

export class Conditions {
    static Arms() {
        return Condition.new("Arms")
            .addCheck((character) => Checks.bodyPartState(character, "arms", States.healthy));
    }

    static Hands() {
        return Condition.new("Hands")
            .addSubcondition(Conditions.Arms())
            .addCheck((character) => Checks.bodyPartState(character, "hands", States.healthy));
    }

    static Eyes() {
        return Condition.new("Eyes")
            .addCheck((character) => Checks.bodyPartState(character, "eyes", States.healthy));
    }

    static Healthy() {
        return Condition.new("HealthyObject")
            .addCheck((obj) => obj.state === States.healthy);
    }
}