import {NumberGenerator} from "./NumberGenerator.mjs";
import {Numbers} from "../Helpers/Numbers.mjs";

export class WordGenerator {
    static generateWord(characterDistribution) {
        const wordLength = this.generateWordLength();
        const characters = this.generateCharactersByDistribution(characterDistribution, wordLength);
        let word = this.buildWordFromArray(characters);
        word = this.ensureVowel(word);
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    static buildWordFromArray(characters) {
        let word = "";
        let lastCharacter = "";
        const originalLength = characters.length;
        for (let i = 0; i < characters.length && word.length < originalLength * 2; i++) {
            const character = characters[i];
            word += character;
        }
        return word;
    }

    static isVowel(character) {
        return this.vowels(true).includes(character.toLowerCase());
    }

    static ensureVowel(word) {
        if (this.isVowel(word.charAt(0))) {
            return word;
        }
        const vowel = this.generateVowels(1, 1);
        const position = NumberGenerator.random(0, word.length - 1, true);
        return word.slice(0, position) + vowel + word.slice(position);
    }

    static generateCharactersByDistribution(distribution, count) {
        let repeatedCharacters = [];
        for (let char in distribution) {
            let repetitions = Math.ceil(distribution[char] * count);
            repeatedCharacters.push(...Array(repetitions).fill(char));
        }
        const shuffledCharacters = Numbers.shuffleArray(repeatedCharacters);
        return shuffledCharacters.slice(0, count);
    }

    static vowels(asArray = false) {
        const vowels = "aeiou";
        return !asArray ? vowels : vowels.split("");
    }

    static consonants(asArray = false) {
        const consonants = "bcdfghjklmnpqrstvwxyz";
        return !asArray ? consonants : consonants.split("");
    }

    static generateWordLength() {
        return NumberGenerator.randomWithBias(2, 9, 4, 0.6, true);
    }

    static generateVowels(minCount = 1, maxCount = 3) {
        return this.generateCharacters(WordGenerator.vowels(), minCount, maxCount);
    }

    static generateConsonants(minCount = 1, maxCount = 3) {
        return this.generateCharacters(WordGenerator.consonants(), minCount, maxCount);
    }

    static generateCharacters(characters, minCount, maxCount) {
        const vowelCount = NumberGenerator.random(minCount, maxCount, true);
        let word = "";
        for (let i = 0; i < vowelCount; i++) {
            word += characters[NumberGenerator.random(0, characters.length - 1, true)];
        }
        return word;
    }
}