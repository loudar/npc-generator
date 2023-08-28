import {Skill} from "./Skill.mjs";
import {Conditions} from "../Conditions.mjs";

export class PhysicalSkills {
    static Listening() {
        return new Skill("Listening")
            .requires(Conditions.Ears());
    }

    static Sight() {
        return new Skill("Sight")
            .requires(Conditions.Eyes());
    }

    static Calligraphy() {
        return new Skill("Calligraphy")
            .requires(Conditions.Hands())
            .addSubskill(PhysicalSkills.Writing());
    }

    static Writing() {
        return new Skill("Write")
            .requires(Conditions.Hands())
            .addSubskill(PhysicalSkills.Sight())
    }

    static Read() {
        return new Skill("Read")
            .addSubskill(PhysicalSkills.Sight());
    }

    static Brewing() {
        return new Skill("Brewing")
            .requires(Conditions.Hands());
    }

    static Distilling() {
        return new Skill("Distilling")
            .requires(Conditions.Hands());
    }

    static Drawing() {
        return new Skill("Drawing")
            .requires(Conditions.Hands());
    }

    static Taste() {
        return new Skill("Taste")
            .requires(Conditions.Tongue());
    }

    static Mixing() {
        return new Skill("Mixing")
            .requires(Conditions.Hands());
    }

    static Cooking() {
        return new Skill("Cooking")
            .addSubskill(PhysicalSkills.Sight())
            .addSubskill(PhysicalSkills.Taste());
    }

    static Farming() {
        return new Skill("Farming")
            .requires(Conditions.Hands());
    }

    static Surgery() {
        return new Skill("Surgery")
            .requires(Conditions.Hands());
    }

    static Butchery() {
        return new Skill("Butchery")
            .requires(Conditions.Hands());
    }

    static Hunting() {
        return new Skill("Hunting")
            .requires(Conditions.Hands());
    }

    static Fishing() {
        return new Skill("Fishing")
            .requires(Conditions.Hands());
    }

    static Balance() {
        return new Skill("Balance")
            .requires(Conditions.Legs());
    }

    static Woodcutting() {
        return new Skill("Woodcutting")
            .requires(Conditions.Hands());
    }

    static Carpentry() {
        return new Skill("Carpentry")
            .requires(Conditions.Hands());
    }

    static Logging() {
        return new Skill("Logging")
            .requires(Conditions.Hands());
    }

    static Bowcraft() {
        return new Skill("Bowcraft")
            .requires(Conditions.Hands());
    }

    static Digging() {
        return new Skill("Digging")
            .requires(Conditions.Hands());
    }

    static Mining() {
        return new Skill("Mining")
            .addSubskill(PhysicalSkills.Digging());
    }

    static Speaking() {
        return new Skill("Speaking")
            .requires(Conditions.Tongue());
    }

    static Smithing() {
        return new Skill("Smithing")
            .addSubskill(PhysicalSkills.Hammering())
            .requires(Conditions.Hands());
    }

    static Hammering() {
        return new Skill("Hammering")
            .requires(Conditions.Hands());
    }

    static Gardening() {
        return new Skill("Gardening")
            .requires(Conditions.Hands());
    }

    static Milling() {
        return new Skill("Milling")
            .requires(Conditions.Hands());
    }

    static AnimalHusbandry() {
        return new Skill("Animal Husbandry")
            .requires(Conditions.Hands());
    }

    static Beekeeping() {
        return new Skill("Beekeeping")
            .requires(Conditions.Hands());
    }

    static Cutting() {
        return new Skill("Cutting")
            .requires(Conditions.Hands());
    }

    static Baking() {
        return new Skill("Baking")
            .requires(Conditions.Hands());
    }

    static Tanning() {
        return new Skill("Tanning")
            .requires(Conditions.Hands());
    }

    static Leatherworking() {
        return new Skill("Leatherworking")
            .requires(Conditions.Hands());
    }

    static Sewing() {
        return new Skill("Sewing")
            .requires(Conditions.Hands());
    }

    static Tailoring() {
        return new Skill("Tailoring")
            .requires(Conditions.Hands());
    }

    static Skinning() {
        return new Skill("Skinning")
            .requires(Conditions.Hands());
    }

    static Jewelcrafting() {
        return new Skill("Jewelcrafting")
            .requires(Conditions.Hands());
    }

    static Weaponsmithing() {
        return new Skill("Weaponsmithing")
            .requires(Conditions.Hands());
    }

    static Armorsmithing() {
        return new Skill("Armorsmithing")
            .requires(Conditions.Hands());
    }

    static Cheesemaking() {
        return new Skill("Cheesemaking")
            .requires(Conditions.Hands());
    }
}