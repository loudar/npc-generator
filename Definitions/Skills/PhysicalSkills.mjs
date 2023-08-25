import {Skill} from "./Skill.mjs";
import {Conditions} from "../Conditions.mjs";

export class PhysicalSkills {
    static Listening() {
        return Skill.new("Listening");
    }

    static Sight() {
        return Skill.new("Sight")
            .requires(Conditions.Eyes());
    }

    static Calligraphy() {
        return Skill.new("Calligraphy")
            .requires(Conditions.Hands())
            .addSubskill(PhysicalSkills.Write());
    }

    static Write() {
        return Skill.new("Write")
            .requires(Conditions.Hands())
            .addSubskill(PhysicalSkills.Sight())
    }

    static Read() {
        return Skill.new("Read")
            .addSubskill(PhysicalSkills.Sight());
    }

    static Brewing() {
        return Skill.new("Brewing")
            .requires(Conditions.Hands());
    }

    static Distilling() {
        return Skill.new("Distilling")
            .requires(Conditions.Hands());
    }

    static Drawing() {
        return Skill.new("Drawing")
            .requires(Conditions.Hands());
    }

    static Taste() {
        return Skill.new("Taste")
            .requires(Conditions.Tongue());
    }

    static Mixing() {
        return Skill.new("Mixing")
            .requires(Conditions.Hands());
    }

    static Cooking() {
        return Skill.new("Cooking")
            .addSubskill(PhysicalSkills.Sight())
            .addSubskill(PhysicalSkills.Taste());
    }

    static Farming() {
        return Skill.new("Farming");
    }

    static Surgery() {
        return Skill.new("Surgery")
            .requires(Conditions.Hands());
    }

    static Butchery() {
        return Skill.new("Butchery")
            .requires(Conditions.Hands());
    }

    static Hunting() {
        return Skill.new("Hunting")
            .requires(Conditions.Hands());
    }

    static Fishing() {
        return Skill.new("Fishing")
            .requires(Conditions.Hands());
    }

    static Balance() {
        return Skill.new("Balance")
            .requires(Conditions.Legs());
    }
}