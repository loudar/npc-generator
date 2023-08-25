import {NameGenerator} from "./NameGenerator.mjs";
import {Character} from "../Definitions/Physical/Character.mjs";
import {BackgroundGenerator} from "./BackgroundGenerator.mjs";

export class CharacterGenerator {
    static generateCharacter() {
        const character = Character.new(NameGenerator.generateName());
        BackgroundGenerator.generateBackground(character);
        return character;
    }
}