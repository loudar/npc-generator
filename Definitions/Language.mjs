export class Language {
    constructor(characterDistribution, languageComplexity, dictionary) {
        this.characterDistribution = characterDistribution;
        this.languageComplexity = languageComplexity;
        this.dictionary = dictionary.sort((a, b) => a.word.localeCompare(b.word));
    }
}