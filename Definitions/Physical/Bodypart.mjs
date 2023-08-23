import {States} from "./States.mjs";
import {ObjectFactory} from "../Extensions/ObjectFactory.mjs";

export class Bodypart {
    static new(name) {
        let baseObject = {
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
        return ObjectFactory.addActions(baseObject);
    }
}