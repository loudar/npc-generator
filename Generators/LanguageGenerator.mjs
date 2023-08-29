import {NumberGenerator} from "./NumberGenerator.mjs";
import {Numbers} from "../Helpers/Numbers.mjs";
import {WordGenerator} from "./WordGenerator.mjs";
import {Language} from "../Definitions/Language.mjs";
import {DistributionSolver} from "./DistributionSolver.mjs";

export class LanguageGenerator {
    static generateLanguage() {
        const languageComplexity = NumberGenerator.randomWithBias(0, 1, 0.5, 0.5);
        const characterDistribution = this.generateCharacterDistribution(languageComplexity);
        const wordList = this.generateWords(characterDistribution, languageComplexity, 5000 + Math.floor(languageComplexity * 500 * 1000));
        const typeDistribution = this.generateTypeDistribution();
        const words = this.categorizeWords(wordList, typeDistribution);
        return new Language(characterDistribution, languageComplexity, words);
    }

    static generateTypeDistribution(wordList) {
        return {
            nouns: 0.5,
            verbs: 0.2,
            adjectives: 0.2,
            adverbs: 0.1,
        }
    }

    static categorizeWords(words, typeDistribution) {
        const categorizedWords = [];
        for (const word of words) {
            const type = DistributionSolver.chooseKeyByDistribution(typeDistribution);
            categorizedWords.push({word, type});
        }
        return categorizedWords;
    }

    static generateWords(characterDistribution, languageComplexity, wordCount) {
        const words = [];
        let percent = 0;
        for (let i = 0; words.length < wordCount; i++) {
            const newPercent = Math.floor(((words.length + 1) / wordCount) * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:LANG_${percent}% (${words.length + 1}/${wordCount})`);
            }
            const newWord = WordGenerator.generateWord(characterDistribution, languageComplexity);
            if (!words.includes(newWord)) {
                words.push(newWord);
            }
        }
        return words;
    }

    static generateCharacterDistribution(languageComplexity) {
        const characters = "abcdefghijklmnopqrstuvwxyz";
        const distribution = NumberGenerator.antiExponentialDistribution(characters.length, 2 - languageComplexity, 0.02 + (languageComplexity * 0.1));
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