import {Skill} from "./Skill.mjs";
import {Conditions} from "../Conditions.mjs";

export class PhysicalSkills {
    static Listening() {
        return Skill.new("Listening")
            .requires(Conditions.Ears());
    }

    static Sight() {
        return Skill.new("Sight")
            .requires(Conditions.Eyes());
    }

    static Calligraphy() {
        return Skill.new("Calligraphy")
            .requires(Conditions.Hands())
            .addSubskill(PhysicalSkills.Writing());
    }

    static Writing() {
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
        return Skill.new("Farming")
            .requires(Conditions.Hands());
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

    static Woodcutting() {
        return Skill.new("Woodcutting")
            .requires(Conditions.Hands());
    }

    static Carpentry() {
        return Skill.new("Carpentry")
            .requires(Conditions.Hands());
    }

    static Logging() {
        return Skill.new("Logging")
            .requires(Conditions.Hands());
    }

    static Bowcraft() {
        return Skill.new("Bowcraft")
            .requires(Conditions.Hands());
    }

    static Digging() {
        return Skill.new("Digging")
            .requires(Conditions.Hands());
    }

    static Mining() {
        return Skill.new("Mining")
            .addSubskill(PhysicalSkills.Digging());
    }

    static Speaking() {
        return Skill.new("Speaking")
            .requires(Conditions.Tongue());
    }

    static Smithing() {
        return Skill.new("Smithing")
            .addSubskill(PhysicalSkills.Hammering())
            .requires(Conditions.Hands());
    }

    static Hammering() {
        return Skill.new("Hammering")
            .requires(Conditions.Hands());
    }

    static Gardening() {
        return Skill.new("Gardening")
            .requires(Conditions.Hands());
    }

    static Milling() {
        return Skill.new("Milling")
            .requires(Conditions.Hands());
    }

    static AnimalHusbandry() {
        return Skill.new("Animal Husbandry")
            .requires(Conditions.Hands());
    }

    static Beekeeping() {
        return Skill.new("Beekeeping")
            .requires(Conditions.Hands());
    }

    static Cutting() {
        return Skill.new("Cutting")
            .requires(Conditions.Hands());
    }

    static Baking() {
        return Skill.new("Baking")
            .requires(Conditions.Hands());
    }

    static Tanning() {
        return Skill.new("Tanning")
            .requires(Conditions.Hands());
    }

    static Leatherworking() {
        return Skill.new("Leatherworking")
            .requires(Conditions.Hands());
    }

    static Sewing() {
        return Skill.new("Sewing")
            .requires(Conditions.Hands());
    }

    static Tailoring() {
        return Skill.new("Tailoring")
            .requires(Conditions.Hands());
    }

    static Skinning() {
        return Skill.new("Skinning")
            .requires(Conditions.Hands());
    }

    static Jewelcrafting() {
        return Skill.new("Jewelcrafting")
            .requires(Conditions.Hands());
    }

    static Weaponsmithing() {
        return Skill.new("Weaponsmithing")
            .requires(Conditions.Hands());
    }

    static Armorsmithing() {
        return Skill.new("Armorsmithing")
            .requires(Conditions.Hands());
    }

    static Cheesemaking() {
        return Skill.new("Cheesemaking")
            .requires(Conditions.Hands());
    }
}