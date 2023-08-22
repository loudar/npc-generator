export class Action {
    static new(name, verb = name) {
        return {
            name: name.toLowerCase(),
            verb: verb.toLowerCase(),
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
            perform: function(object, sentence = "{object} {action}s") {
                if (!this.check(object)) {
                    return {
                        actionResult: null,
                        sentence: "Nothing happens."
                    };
                }
                const result = this.action(object);
                return {
                    actionResult: result,
                    sentence: sentence.replace("{action}", this.verb).replace("{object}", object.name)
                };
            }
        };
    }
}