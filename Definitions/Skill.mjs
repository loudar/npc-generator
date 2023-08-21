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