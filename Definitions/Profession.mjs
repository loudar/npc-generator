export class Profession {
    static new(name) {
        return {
            name: name,
            type: "Profession",
            skills: [],
            addSkill: function(skill) {
                this.skills.push(skill);
                return this;
            }
        };
    }
}