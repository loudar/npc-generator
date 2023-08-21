import {States} from "./States.js";

export class Bodypart {
    static new(name) {
        return {
            name: name.toLowerCase(),
            type: "Bodypart",
            state: States.healthy,
            properties: [],
            addProperty: function(property) {
                this.properties.push(property);
                return this;
            },
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
            getAvailableActions: function() {
                let actions = [];
                for (let action of this.actions) {
                    if (action.check(this)) {
                        actions.push(action);
                    }
                }
                return actions;
            },
            act: function(actionName) {
                for (let action of this.actions) {
                    if (action.name === actionName.toLowerCase()) {
                        return action.perform(this);
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