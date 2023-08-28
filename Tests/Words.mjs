import {Language} from "../Definitions/Language.mjs";

const language = Language.new();
const words = language.words;
const averageLength = words.reduce((acc, word) => acc + word.length, 0) / words.length;

console.log(`Character distribution:`, language.characterDistribution);
console.log(`Average length:`, averageLength);
console.log(`Words:`, words.length);
console.log(`Language complexity:`, language.languageComplexity);