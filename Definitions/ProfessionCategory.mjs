export class ProfessionCategory {
    constructor(name) {
        this.name = name;
        this.type = "ProfessionCategory";
        this.professions = [];
        return this;
    }

    addProfession(profession) {
        this.professions.push(profession);
        return this;
    }
}