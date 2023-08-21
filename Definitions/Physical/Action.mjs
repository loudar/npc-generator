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
            check: function(character, object) {
                for (let condition of this.conditions) {
                    if (!condition.check(character, object)) {
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
            perform: function(character, object) {
                return this.action(character, object);
            }
        };
    }
}