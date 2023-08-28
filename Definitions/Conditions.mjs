import {Condition} from "./Condition.mjs";
import {States} from "./Physical/States.mjs";
import {Checks} from "./Checks.mjs";

export class Conditions {
    static Arms() {
        return new Condition("Arms")
            .addCheck((character) => Checks.bodyPartState(character, "arms", States.healthy));
    }

    static Hands() {
        return new Condition("Hands")
            .addSubcondition(Conditions.Arms())
            .addCheck((character) => Checks.bodyPartState(character, "hands", States.healthy));
    }

    static Legs() {
        return new Condition("Legs")
            .addCheck((character) => Checks.bodyPartState(character, "legs", States.healthy));
    }

    static Eyes() {
        return new Condition("Eyes")
            .addCheck((character) => Checks.bodyPartState(character, "eyes", States.healthy));
    }

    static Tongue() {
        return new Condition("Tongue")
            .addCheck((character) => Checks.bodyPartState(character, "mouth", States.healthy))
            .addCheck((character) => Checks.bodyPartState(character, "tongue", States.healthy));
    }

    static Ears() {
        return new Condition("Ears")
            .addCheck((character) => Checks.bodyPartState(character, "ears", States.healthy));
    }

    static Healthy() {
        return new Condition("HealthyObject")
            .addCheck((obj) => obj.state === States.healthy);
    }
}