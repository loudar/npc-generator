import {Condition} from "./Condition.mjs";
import {States} from "./Physical/States.mjs";
import {Checks} from "./Checks.mjs";

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

    static Legs() {
        return Condition.new("Legs")
            .addCheck((character) => Checks.bodyPartState(character, "legs", States.healthy));
    }

    static Eyes() {
        return Condition.new("Eyes")
            .addCheck((character) => Checks.bodyPartState(character, "eyes", States.healthy));
    }

    static Tongue() {
        return Condition.new("Tongue")
            .addCheck((character) => Checks.bodyPartState(character, "tongue", States.healthy));
    }

    static Healthy() {
        return Condition.new("HealthyObject")
            .addCheck((obj) => obj.state === States.healthy);
    }
}