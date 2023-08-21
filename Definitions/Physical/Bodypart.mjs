export class Bodypart {
    static new(name) {
        return {
            name: name,
            type: "Bodypart",
            state: "Healthy",
            subparts: [],
            addSubpart: function(subpart) {
                this.subparts.push(subpart);
                return this;
            },
            getBodypart: function(bodypartName) {
                if (this.name === bodypartName) {
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
                this.state = state;
                return this;
            },
            has: function(bodypartName) {
                for (let subpart of this.subparts) {
                    if (subpart.name === bodypartName && subpart.state === "Healthy") {
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