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
            act: function (actionName, sentence) {
                for (let action of this.actions) {
                    if (action.name === actionName.toLowerCase()) {
                        return action.perform(this, sentence);
                    }
                }
                return {
                    actionResult: null,
                    sentence: "Nothing happens."
                };
            },
        };
        Object.assign(object, actions);
        return object;
    }
}