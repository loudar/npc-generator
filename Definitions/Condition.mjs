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
                    const subcond = subcondition.check(character, object);
                    if (!subcond) {
                        console.log(`Failed subcondition: ${subcondition.name}`);
                    }
                    passed = passed && subcond;
                }
                for (let check of this.checks) {
                    const success = check(character, object);
                    if (!success) {
                        console.log(`Failed check: ${this.name}`);
                    }
                    passed = passed && success;
                }
                return passed;
            }
        };
    }
}