import {States} from "./States.mjs";
import {Actionable} from "../Extensions/Actionable.mjs";
import {PropertyStore} from "../Extensions/PropertyStore.mjs";

export class Bodypart extends Actionable(PropertyStore) {
    constructor(name) {
        super();
        this.name = name.toLowerCase();
        this.type = "Bodypart";
        this.state = States.healthy;
        this.properties = [];
        this.subparts = [];
        return this;
    }

    addProperty(property) {
        this.properties.push(property);
        return this;
    };

    addSubpart(subpart) {
        this.subparts.push(subpart);
        return this;
    }

    getBodypart(bodypartName) {
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
    }

    setState(state) {
        this.state = state.toLowerCase();
        return this;
    }

    has(bodypartName) {
        for (let subpart of this.subparts) {
            if (subpart.name === bodypartName.toLowerCase()) {
                return true;
            } else if (subpart.has(bodypartName)) {
                return true;
            }
        }
        return false;
    }
}