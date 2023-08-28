import {NumberGenerator} from "./NumberGenerator.mjs";
import {Numbers} from "../Helpers/Numbers.mjs";

export class WordGenerator {
    static generateWord(characterDistribution, languageComplexity) {
        const wordLength = this.generateWordLength(languageComplexity);
        const characters = this.generateCharactersByDistribution(characterDistribution, wordLength);
        let word = this.buildStringFromArray(characters);
        word = this.ensureVowels(word, characterDistribution);
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    static buildStringFromArray(characters) {
        return characters.join("");
    }

    static isVowel(character) {
        return this.vowels(true).includes(character.toLowerCase());
    }

    static ensureVowels(word, distribution) {
        const regex = /([^aeiouyj]{4,})/gi; // Matches sequences of 4 or more consonants
        let match = regex.exec(word);

        while (match !== null) {
            const [fullMatch] = match;
            const positionToInsert = Math.floor(fullMatch.length / 2); // Find the middle of the matched consonants
            const newVowel = this.generateVowels(distribution, 1, 1); // Generate a new vowel

            // Replace the matched sequence of consonants by inserting the new vowel in the middle
            word = word.replace(
                fullMatch,
                fullMatch.substring(0, positionToInsert) + newVowel + fullMatch.substring(positionToInsert)
            );

            match = regex.exec(word);
        }

        return word;
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
        const vowels = "aeiouyj";
        return !asArray ? vowels : vowels.split("");
    }

    static consonants(asArray = false) {
        const consonants = "bcdfghklmnpqrstvwxz";
        return !asArray ? consonants : consonants.split("");
    }

    static generateWordLength(complexity = 0.5) {
        return NumberGenerator.randomWithBias(2 + complexity, 8 + (complexity * 5), 4 + (complexity * 2), 0.9 - (complexity * 0.5), true);
    }

    static generateVowels(distribution, minCount = 1, maxCount = 3) {
        return this.generateCharacters(distribution, WordGenerator.vowels(), minCount, maxCount);
    }

    static generateConsonants(distribution, minCount = 1, maxCount = 3) {
        return this.generateCharacters(distribution, WordGenerator.consonants(), minCount, maxCount);
    }

    static generateCharacters(distribution, characters, minCount, maxCount) {
        const filteredDistribution = {};
        for (const character of characters) {
            filteredDistribution[character] = distribution[character];
        }
        return this.generateCharactersByDistribution(filteredDistribution, NumberGenerator.random(minCount, maxCount, true));
    }
}