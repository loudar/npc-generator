export class Action {
    static new(name) {
        return {
            name: name.toLowerCase(),
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
            action: (character, object) => {},
            set: function(func) {
                this.action = func;
                return this;
            },
            perform: function(object) {
                if (!this.check(object)) {
                    return null;
                }
                return this.action(object);
            }
        };
    }
}