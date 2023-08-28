import {SourceLoader} from "./Sources/SourceLoader.mjs";
import {NumberGenerator} from "./NumberGenerator.mjs";

export class NameGenerator {
    static generateName() {
        return this.generateFirstName() + " " + this.generateLastName();
    }

    static generateFirstName() {
        const names = SourceLoader.get("FirstNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }

    static generateLastName() {
        const names = SourceLoader.get("LastNames");
        return names[NumberGenerator.random(0, names.length - 1, true)];
    }
}