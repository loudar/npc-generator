export class Action {
    constructor(name, verbs = { en: name }) {
        this.name = name.toLowerCase();
        this.verb = verbs;
        this.type = "Action";
        this.conditions = [];
        this.action = (object, parameters) => {};
        return this;
    }

    addCondition(condition) {
        this.conditions.push(condition);
        return this;
    }

    check(object) {
        for (let condition of this.conditions) {
            if (!condition.check(object)) {
                return false;
            }
        }
        return true;
    }

    set(func) {
        this.action = func;
        return this;
    }

    perform(object, parameters = {}) {
        if (!this.check(object)) {
            return {
                error: `Failed precondition in action: ${this.name}`,
            };
        }
        const result = this.action(object, parameters);
        return {
            actionResult: result,
            action: this,
        }
    }
}