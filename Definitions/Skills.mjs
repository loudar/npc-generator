import {Skill} from "./Skill.mjs";
import {Conditions} from "./Conditions.mjs";

export class Skills {
    static Sight() {
        return Skill.new("Sight")
            .requires(Conditions.Eyes());
    }

    static Read() {
        return Skill.new("Read")
            .addSubskill(Skills.Sight());
    }

    static Write() {
        return Skill.new("Write")
            .requires(Conditions.Hands())
            .addSubskill(Skills.Sight())
    }

    static Literacy() {
        return Skill.new("Literacy")
            .addSubskill(Skills.Read())
            .addSubskill(Skills.Write().optional());
    }

    static Understanding() {
        return Skill.new("Understanding");
    }

    static Research() {
        return Skill.new("Research")
            .addSubskill(Skills.Understanding())
            .addSubskill(Skills.Literacy());
    }

    static Drawing() {
        return Skill.new("Drawing")
            .requires(Conditions.Hands());
    }
}