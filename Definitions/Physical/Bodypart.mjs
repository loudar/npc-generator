export class Bodypart {
    static new(name) {
        return {
            name: name.toLowerCase(),
            type: "Bodypart",
            state: "healthy",
            subparts: [],
            addSubpart: function(subpart) {
                this.subparts.push(subpart);
                return this;
            },
            actions: [],
            addAction: function(action) {
                this.actions.push(action);
                return this;
            },
            getAvailableActions: function(character) {
                let actions = [];
                for (let action of this.actions) {
                    if (action.check(character, this)) {
                        actions.push(action);
                    }
                }
                return actions;
            },
            act: function(actionName, character) {
                for (let action of this.actions) {
                    if (action.name === actionName.toLowerCase() && action.check(character, this)) {
                        return action.perform(character, this);
                    }
                }
                return null;
            },
            getBodypart: function(bodypartName) {
                if (this.name === bodypartName.toLowerCase()) {
                    return this;
                } else {
                    for (let subpart of this.subparts) {
                        let found = subpart.getBodypart(bodypartName);
                        if (found) {
                            return found;
                        }
                    }
                }
                return null;
            },
            setState(state) {
                this.state = state.toLowerCase();
                return this;
            },
            has: function(bodypartName) {
                for (let subpart of this.subparts) {
                    if (subpart.name === bodypartName.toLowerCase()) {
                        return true;
                    } else if (subpart.has(bodypartName)) {
                        return true;
                    }
                }
                return false;
            }
        };
    }
}