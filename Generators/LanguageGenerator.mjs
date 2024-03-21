import {NumberGenerator} from "./NumberGenerator.mjs";
import {Numbers} from "../Helpers/Numbers.mjs";
import {WordGenerator} from "./WordGenerator.mjs";
import {Language} from "../Definitions/Language.mjs";
import {DistributionSolver} from "./DistributionSolver.mjs";

export class LanguageGenerator {
    static generateLanguage(setProgress, seed) {
        const languageComplexity = NumberGenerator.randomWithBias(0, 1, seed, 0.5, 0.5);
        const characterDistribution = this.generateCharacterDistribution(languageComplexity, seed);
        const wordCount = 5000 + Math.floor(languageComplexity * 500 * 100);
        const wordList = this.generateWords(setProgress, characterDistribution, languageComplexity, wordCount, seed);
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

    static generateComplexityDistribution(languageComplexity, wordLength) {
        return {
            easy: 0.6 + ((1 - languageComplexity) * 0.5) + (wordLength * 0.1),
            medium: 0.3 + (languageComplexity * 0.4) + (wordLength * 0.2),
            hard: 0.2 + (languageComplexity * 0.3) + (wordLength * 0.3),
        }
    }

    static categorizeWords(words, typeDistribution) {
        const categorizedWords = [];
        for (const word of words) {
            const type = DistributionSolver.chooseKeyByDistribution(typeDistribution);
            const complexity = DistributionSolver.chooseKeyByDistribution(this.generateComplexityDistribution(type, word.length));
            categorizedWords.push({word, type, complexity});
        }
        return categorizedWords;
    }

    static generateWords(setProgress, characterDistribution, languageComplexity, wordCount, seed) {
        const words = [];
        let percent = 0;
        for (let i = 0; words.length < wordCount; i++) {
            const newPercent = Math.floor(((words.length + 1) / wordCount) * 100);
            if (newPercent > percent) {
                percent = newPercent;
                console.log(`GEN:LANG_${percent}% (${words.length + 1}/${wordCount})`);
                setProgress("language", percent);
            }
            const newWord = WordGenerator.generateWord(characterDistribution, languageComplexity, seed);
            if (!words.includes(newWord)) {
                words.push(newWord);
            }
        }
        return words;
    }

    static generateCharacterDistribution(languageComplexity, seed) {
        const characters = "abcdefghijklmnopqrstuvwxyz";
        const distribution = NumberGenerator.antiExponentialDistribution(characters.length, 2 - languageComplexity, 0.02 + (languageComplexity * 0.1), seed);
        return this.assignDistributionToCharacters(characters, distribution, seed);
    }

    static assignDistributionToCharacters(characters, distribution, seed) {
        const shuffledDistribution = Numbers.shuffleArray([...distribution], seed);
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