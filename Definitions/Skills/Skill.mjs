export class Skill {
    constructor(name, cost = 1) {
        this.name = name.toLowerCase();
        this.type = "Skill";
        this.subskills = [];
        this.requirements = [];
        this.required = true;
        this.cost = cost;
        return this;
    }

    addSubskill(subskill) {
        this.subskills.push(subskill);
        return this;
    }

    requires(condition) {
        this.requirements.push(condition)
        return this;
    }

    optional() {
        this.required = false;
        return this;
    }

    canBeLearned(character) {
        for (let requirement of this.requirements) {
            if (!requirement.check(character)) {
                return [
                    `Failed requirement: ${requirement.name}`
                ];
            }
        }
        for (let subskill of this.subskills) {
            let subSkillErrors = subskill.canBeLearned(character);
            if (subskill.required && subSkillErrors.length > 0) {
                return [
                    `Missing subskill: ${subskill.name}`
                ].concat(subSkillErrors);
            }
        }
        return [];
    }

    costToLearn() {
        let cost = 1;
        for (let subskill of this.subskills) {
            cost += subskill.costToLearn();
        }
        return cost;
    }
}