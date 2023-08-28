export class Profession {
    constructor(name) {
        this.name = name;
        this.type = "Profession";
        this.skills = [];
        return this;
    }

    addSkill(skill) {
        this.skills.push(skill);
        return this;
    }
}