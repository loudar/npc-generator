export class Skill {
    static new(name) {
        return {
            name: name,
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
                        return false;
                    }
                }
                for (let subskill of this.subskills) {
                    if (!subskill.canBeLearned(character)) {
                        return false;
                    }
                }
                return true;
            }
        };
    }
}