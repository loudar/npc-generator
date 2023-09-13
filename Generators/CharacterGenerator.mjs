import {NameGenerator} from "./NameGenerator.mjs";
import {Character} from "../Definitions/Physical/Character.mjs";
import {BackgroundGenerator} from "./BackgroundGenerator.mjs";

export class CharacterGenerator {
    static generateCharacter(population, seed) {
        const character = new Character(NameGenerator.generateName(seed));
        BackgroundGenerator.generateBackground(character, population, seed);
        return character;
    }
}