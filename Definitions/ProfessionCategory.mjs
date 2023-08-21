export class ProfessionCategory {
    static new(name) {
        return {
            name: name,
            type: "ProfessionCategory",
            professions: [],
            addProfession: function(profession) {
                this.professions.push(profession);
                return this;
            }
        };
    }
}