import {LanguageGenerator} from "../Generators/LanguageGenerator.mjs";
import fs from "fs";
import {SentenceGenerator} from "../Generators/SentenceGenerator.mjs";
import {CLI} from "../Utilities/CLI.mjs";

const startDir = process.cwd();
process.chdir("../");
const language = LanguageGenerator.generateLanguage(() => {});
process.chdir(startDir);
fs.writeFileSync(`Results/Language-${Date.now()}.json`, JSON.stringify(language, null, 4));
const dictionary = language.dictionary;
const averageLength = dictionary.reduce((acc, entry) => acc + entry.word.length, 0) / dictionary.length;

console.log(`Character distribution:`, language.characterDistribution);
console.log(`Average length:`, averageLength);
console.log(`Words:`, dictionary.length);
console.log(`Language complexity:`, language.languageComplexity);

let sentence = SentenceGenerator.random(dictionary);
CLI.writeInfo(`Random sentence:`);
CLI.write(sentence);
const translatedSentence = sentence.split(" ").map(word => dictionary.find(entry => entry.word === word.toLowerCase()).translation).join(" ");
CLI.write(translatedSentence);

// Testing translation
const englishSentence = "This is a test sentence. It should be translated to the generated language.";
const englishWords = englishSentence.split(" ");
sentence = SentenceGenerator.translate(englishSentence, dictionary);
const translatedWords = sentence.split(" ");

CLI.writeInfo(`Translation:`);
CLI.sameLineDiff(translatedWords, englishWords);