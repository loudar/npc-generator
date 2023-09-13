import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";

export class NameGenerator {
    static generateName(seed) {
        return this.generateFirstName(seed) + " " + this.generateLastName(seed);
    }

    static generateFirstName(seed) {
        const names = SourceLoader.get("FirstNames");
        return names[NumberGenerator.random(0, names.length, seed, true)];
    }

    static generateLastName(seed) {
        const names = SourceLoader.get("LastNames");
        return names[NumberGenerator.random(0, names.length, seed, true)];
    }
}