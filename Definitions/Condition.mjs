export class Condition {
    constructor(name) {
        this.name = name;
        this.type = "Condition";
        this.subconditions = [];
        this.checks = [];
    }

    addSubcondition(subcondition) {
        this.subconditions.push(subcondition);
        return this;
    }

    addCheck(checkFunction) {
        this.checks.push(checkFunction);
        return this;
    }

    check(character) {
        let passed = true;
        for (let subcondition of this.subconditions) {
            const subcond = subcondition.check(character);
            if (!subcond) {
                console.log(` -> Failed subcondition: ${subcondition.name}`);
            }
            passed = passed && subcond;
        }
        for (let check of this.checks) {
            const success = check(character);
            passed = passed && success;
        }
        return passed;
    }
}