import {NumberGenerator} from "./NumberGenerator.mjs";
import {Numbers} from "../Helpers/Numbers.mjs";
import {WordGenerator} from "./WordGenerator.mjs";
import {Language} from "../Definitions/Language.mjs";
import {DistributionSolver} from "./DistributionSolver.mjs";
import fs from "fs";
import {CLI} from "../Utilities/CLI.mjs";

export class LanguageGenerator {
    static generateLanguage(setProgress, seed) {
        const languageComplexity = NumberGenerator.randomWithBias(0, 1, seed, 0.5, 0.5);
        const characterDistribution = this.generateCharacterDistribution(languageComplexity, seed);
        const wordCount = 105000 + Math.floor(languageComplexity * 500 * 100);
        const wordList = this.generateWords(setProgress, characterDistribution, languageComplexity, wordCount, seed);
        const typeDistribution = this.generateTypeDistribution();
        const words = this.categorizeWords(setProgress, wordList, typeDistribution, seed);
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
            easy: Math.max(0, 0.6 + ((1 - languageComplexity) * 0.5) - (1.1 ** wordLength) + 1),
            medium: 0.3 + (languageComplexity * 0.4) + (wordLength * 0.3),
            hard: (languageComplexity * 0.3) + (1.1 ** wordLength) + 1,
        }
    }

    static getEnglishDictionary(asKeys = true) {
        const executionFolder = process.cwd();
        const sourceDictionaryFile = executionFolder + "/Resources/dictionary.json";
        const sourceDict = fs.readFileSync(sourceDictionaryFile, "utf-8");
        const sourceDictionary = JSON.parse(sourceDict);
        CLI.writeInfo(`Dictionary loaded: ${Object.keys(sourceDictionary).length} words`);
        if (asKeys) {
            return Object.keys(sourceDictionary);
        }
        return sourceDictionary;
    }

    static categorizeWords(setProgress, words, typeDistribution, seed) {
        const categorizedWords = [];
        let translations = this.getEnglishDictionary();
        let percent = 0, translation;
        for (const word of words) {
            const newPercent = Math.floor(((categorizedWords.length + 1) / words.length) * 100);
            if (newPercent > percent) {
                percent = newPercent;
                CLI.rewrite(`GEN:LANG_CAT_${percent}% (${categorizedWords.length + 1}/${words.length})`);
                setProgress("language", 50 + (percent / 2));
            }
            const type = DistributionSolver.chooseKeyByDistribution(typeDistribution, seed);
            const complexity = DistributionSolver.chooseKeyByDistribution(this.generateComplexityDistribution(type, word.length), seed);
            translation = LanguageGenerator.generateTranslation(categorizedWords, translations, seed);
            categorizedWords.push({
                word,
                type,
                complexity,
                translation
            });
        }
        CLI.write("");
        return categorizedWords;
    }

    static generateTranslation(words, translations, seed) {
        if (translations.length === 0) {
            return ""; // Think of a solution here
        }
        let translation;
        do {
            translation = this.randomTranslation(translations, seed);
        } while (words.some(w => w.translation === translation));
        translations = translations.splice(translations.indexOf(translation), 1);
        return translation;
    }

    static randomTranslation(translations, seed) {
        return translations[NumberGenerator.random(0, translations.length, seed, true)];
    }

    static generateWords(setProgress, characterDistribution, languageComplexity, wordCount, seed) {
        const words = [];
        let percent = 0;
        for (let i = 0; words.length < wordCount; i++) {
            const newPercent = Math.floor(((words.length + 1) / wordCount) * 100);
            if (newPercent > percent) {
                percent = newPercent;
                CLI.rewrite(`GEN:LANG_GEN_${percent}% (${words.length + 1}/${wordCount})`);
                setProgress("language", percent / 2);
            }
            const newWord = WordGenerator.generateWord(characterDistribution, languageComplexity, seed);
            if (!words.includes(newWord)) {
                words.push(newWord);
            }
        }
        CLI.write("");
        return words;
    }

    static generateCharacterDistribution(languageComplexity, seed) {
        const characters = "abcdefghijklmnopqrstuvwxyz";
        const distribution = NumberGenerator.antiExponentialDistribution(characters.length, 2 - languageComplexity, 0.02 + (languageComplexity * 0.1), seed);
        const vowels = WordGenerator.vowels(true);
        for (const vowel of vowels) {
            distribution[vowel] *= 1 + ((1 - languageComplexity));
        }
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