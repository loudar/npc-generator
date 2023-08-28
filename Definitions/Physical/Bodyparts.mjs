import {Bodypart} from "./Bodypart.mjs";
import {Actions} from "./Actions.mjs";

export class Bodyparts {
    static Bones() {
        return new Bodypart("Bones")
            .addAction(Actions.BreakObject());
    }
}