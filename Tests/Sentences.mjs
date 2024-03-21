import {LanguageGenerator} from "../Generators/LanguageGenerator.mjs";
import fs from "fs";
import {SentenceGenerator} from "../Generators/SentenceGenerator.mjs";

const language = LanguageGenerator.generateLanguage(() => {});
fs.writeFileSync(`Results/Language-${Date.now()}.json`, JSON.stringify(language, null, 4));
const dictionary = language.dictionary;
const averageLength = dictionary.reduce((acc, entry) => acc + entry.word.length, 0) / dictionary.length;

console.log(`Character distribution:`, language.characterDistribution);
console.log(`Average length:`, averageLength);
console.log(`Words:`, dictionary.length);
console.log(`Language complexity:`, language.languageComplexity);

let sentence = SentenceGenerator.random(dictionary);
console.log(`Random sentence:`, sentence);
const englishSentence = "The quick brown fox jumps over the lazy dog";
sentence = SentenceGenerator.translate(englishSentence, dictionary);
console.log(`Translated sentence:`, sentence);
