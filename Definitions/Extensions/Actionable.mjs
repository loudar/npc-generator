export let Actionable = Base => class extends Base {
    constructor() {
        super();
        this.actions = [];
    }

    addAction(action) {
        this.actions.push(action);
        return this;
    }

    getAvailableActions() {
        let actions = [];
        for (let action of this.actions) {
            if (action.check(this)) {
                actions.push(action);
            }
        }
        return actions;
    }

    act(actionName, parameters = {}) {
        for (let action of this.actions) {
            if (action.name === actionName.toLowerCase()) {
                return action.perform(this, parameters);
            }
        }
        return {
            error: `Action not found on ${this.name}: ${actionName}`,
        };
    }
}