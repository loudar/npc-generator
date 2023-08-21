import {Bodypart} from "./Bodypart.mjs";
import {Actions} from "./Actions.mjs";

export class Bodyparts {
    static Bones() {
        return Bodypart.new("Bones")
            .addAction(Actions.BreakObject());
    }
}