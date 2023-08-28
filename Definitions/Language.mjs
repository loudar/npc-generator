import {NumberGenerator} from "../Generators/NumberGenerator.mjs";
import {Numbers} from "../Helpers/Numbers.mjs";
import {WordGenerator} from "../Generators/WordGenerator.mjs";

export class Language {
    static new() {
        const characterDistribution = this.generateCharacterDistribution();
        const words = this.generateWords(characterDistribution, 100);
        return {
            characterDistribution,
            words: words.sort(),
        };
    }

    static generateWords(characterDistribution, wordCount) {
        const words = [];
        for (let i = 0; words.length < wordCount; i++) {
            const newWord = WordGenerator.generateWord(characterDistribution);
            if (!words.includes(newWord)) {
                words.push(newWord);
            }
        }
        return words;
    }

    static generateCharacterDistribution() {
        const characters = "abcdefghijklmnopqrstuvwxyz";
        const distribution = NumberGenerator.antiExponentialDistribution(characters.length, 1.2, 0.05);
        return this.assignDistributionToCharacters(characters, distribution);
    }

    static assignDistributionToCharacters(characters, distribution) {
        const shuffledDistribution = Numbers.shuffleArray([...distribution]);
        let output = {};
        for (let i = 0; i < characters.length; i++) {
            output[characters[i]] = shuffledDistribution[i];
        }
        const entries = Object.entries(output);
        entries.sort((a, b) => b[1] - a[1]);
        output = {};
        for (const [key, value] of entries) {
            output[key] = value;
        }
        return output;
    }
}