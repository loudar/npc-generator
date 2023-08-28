import {Language} from "../Definitions/Language.mjs";

const language = Language.new();
const words = language.words;
const averageLength = words.reduce((acc, word) => acc + word.length, 0) / words.length;
const duplicates = words.filter((word, index) => words.indexOf(word) !== index);

console.log(words);
console.log(`Average length:`, averageLength);
console.log(`Duplicates:`, duplicates);
console.log(`Character distribution:`, language.characterDistribution);