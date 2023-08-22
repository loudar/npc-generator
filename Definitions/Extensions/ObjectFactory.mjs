export class ObjectFactory {
    static addActions(object) {
        const actions = {
            actions: [],
            addAction: function (action) {
                this.actions.push(action);
                return this;
            },
            getAvailableActions: function () {
                let actions = [];
                for (let action of this.actions) {
                    if (action.check(this)) {
                        actions.push(action);
                    }
                }
                return actions;
            },
            act: function (actionName, parameters = {}) {
                for (let action of this.actions) {
                    if (action.name === actionName.toLowerCase()) {
                        return action.perform(this, parameters);
                    }
                }
                return {
                    error: `Action not found on ${this.name}: ${actionName}`,
                };
            },
        };
        Object.assign(object, actions);
        return object;
    }
}