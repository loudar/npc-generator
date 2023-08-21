export class Condition {
    static new(name) {
        return {
            name: name,
            type: "Condition",
            subconditions: [],
            checks: [],
            addSubcondition: function(subcondition) {
                this.subconditions.push(subcondition);
                return this;
            },
            addCheck: function(checkFunction) {
                this.checks.push(checkFunction);
                return this;
            },
            check: function (character, object) {
                let passed = true;
                for (let subcondition of this.subconditions) {
                    passed = passed && subcondition.check(character, object);
                }
                for (let check of this.checks) {
                    passed = passed && check(character, object);
                }
                return passed;
            }
        };
    }
}