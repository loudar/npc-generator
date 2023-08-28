import {LanguageGenerator} from "../Generators/LanguageGenerator.mjs";
import fs from "fs";

const language = LanguageGenerator.generateLanguage();
fs.writeFileSync(`Results/Language-${Date.now()}.json`, JSON.stringify(language, null, 4));
const dictionary = language.dictionary;
const averageLength = dictionary.reduce((acc, entry) => acc + entry.word.length, 0) / dictionary.length;

console.log(`Character distribution:`, language.characterDistribution);
console.log(`Average length:`, averageLength);
console.log(`Words:`, dictionary.length);
console.log(`Language complexity:`, language.languageComplexity);