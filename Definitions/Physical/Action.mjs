export class Action {
    static new(name, verbs = { en: name }) {
        return {
            name: name.toLowerCase(),
            verb: verbs,
            type: "Action",
            conditions: [],
            addCondition: function(condition) {
                this.conditions.push(condition);
                return this;
            },
            check: function(object) {
                for (let condition of this.conditions) {
                    if (!condition.check(object)) {
                        return false;
                    }
                }
                return true;
            },
            action: (object, parameters) => {},
            set: function(func) {
                this.action = func;
                return this;
            },
            perform: function(object, parameters = {}) {
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
        };
    }
}