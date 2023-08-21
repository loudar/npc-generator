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
            check: function (character) {
                let passed = true;
                for (let subcondition of this.subconditions) {
                    passed = passed && subcondition.check(character);
                }
                for (let check of this.checks) {
                    passed = passed && check(character);
                }
                return passed;
            }
        };
    }
}