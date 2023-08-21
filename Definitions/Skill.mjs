export class Skill {
    static new(name) {
        return {
            name: name.toLowerCase(),
            type: "Skill",
            subskills: [],
            requirements: [],
            required: true,
            addSubskill: function(subskill) {
                this.subskills.push(subskill);
                return this;
            },
            requires: function(condition) {
                this.requirements.push(condition)
                return this;
            },
            optional: function() {
                this.required = false;
                return this;
            },
            canBeLearned: function(character) {
                for (let requirement of this.requirements) {
                    if (!requirement.check(character)) {
                        console.log(` -> Failed requirement: ${requirement.name}`);
                        return false;
                    }
                }
                for (let subskill of this.subskills) {
                    if (subskill.required && !subskill.canBeLearned(character)) {
                        console.log(` -> Missing subskill: ${subskill.name}`);
                        return false;
                    }
                }
                return true;
            },
            costToLearn: function() {
                let cost = 1;
                for (let subskill of this.subskills) {
                    cost += subskill.costToLearn();
                }
                return cost;
            }
        };
    }
}