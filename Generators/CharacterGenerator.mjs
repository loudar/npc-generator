import {NameGenerator} from "./NameGenerator.mjs";
import {Character} from "../Definitions/Physical/Character.mjs";
import {BackgroundGenerator} from "./BackgroundGenerator.mjs";

export class CharacterGenerator {
    static generateCharacter(population) {
        const character = Character.new(NameGenerator.generateName());
        BackgroundGenerator.generateBackground(character, population);
        return character;
    }
}