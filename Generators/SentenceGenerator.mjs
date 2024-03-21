import {NumberGenerator} from "./NumberGenerator.mjs";

export class SentenceGenerator {
    static random(dictionary) {
        const sentence = [];
        const sentenceLength = NumberGenerator.random(5, 20, NumberGenerator.getRandomSeed(), true);
        for (let i = 0; i < sentenceLength; i++) {
            const word = dictionary[NumberGenerator.random(0, dictionary.length, NumberGenerator.getRandomSeed(), true)];
            if (word.type === "noun") {
                word.word = word.word.charAt(0).toUpperCase() + word.word.slice(1);
            } else {
                word.word = word.word.toLowerCase();
            }
            sentence.push(word.word);
        }
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        return sentence.join(" ");
    }
}