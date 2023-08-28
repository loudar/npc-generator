import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";

export class LandGenerator {
    static generateName() {
        const names = SourceLoader.get("LandNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateLand() {
        return {
            name: this.generateName(),
        }
    }
}