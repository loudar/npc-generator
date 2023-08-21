import {Skill} from "./Skill.mjs";
import {Conditions} from "./Conditions.mjs";

export class Skills {
    static Sight() {
        return Skill.new("Sight")
            .requires(Conditions.Eyes());
    }

    static Logic() {
        return Skill.new("Logic");
    }

    static Engineering() {
        return Skill.new("Engineering")
            .addSubskill(Skills.Understanding())
            .addSubskill(Skills.Logic())
            .addSubskill(Skills.Mathematics());
    }

    static Hospitality() {
        return Skill.new("Hospitality");
    }

    static Finance() {
        return Skill.new("Finance");
    }

    static Herbalism() {
        return Skill.new("Herbalism");
    }

    static Farming() {
        return Skill.new("Farming");
    }

    static Calligraphy() {
        return Skill.new("Calligraphy")
            .requires(Conditions.Hands())
            .addSubskill(Skills.Write());
    }

    static Listening() {
        return Skill.new("Listening");
    }

    static Negotiation() {
        return Skill.new("Negotiation")
            .addSubskill(Skills.Logic())
            .addSubskill(Skills.Charisma());
    }

    static Creativity() {
        return Skill.new("Creativity");
    }

    static Astrology() {
        return Skill.new("Astrology");
    }

    static Astronomy() {
        return Skill.new("Astronomy")
            .addSubskill(Skills.Sight());
    }

    static Charisma() {
        return Skill.new("Charisma");
    }

    static Patience() {
        return Skill.new("Patience");
    }

    static Belief() {
        return Skill.new("Belief");
    }

    static Mixing() {
        return Skill.new("Mixing")
            .requires(Conditions.Hands());
    }

    static Taste() {
        return Skill.new("Taste")
            .requires(Conditions.Tongue());
    }

    static Cooking() {
        return Skill.new("Cooking")
            .addSubskill(Skills.Sight())
            .addSubskill(Skills.Taste());
    }

    static Mathematics() {
        return Skill.new("Mathematics")
            .addSubskill(Skills.Understanding())
            .addSubskill(Skills.Literacy())
            .addSubskill(Skills.Logic());
    }

    static Cartography() {
        return Skill.new("Cartography")
            .addSubskill(Skills.Mathematics())
            .addSubskill(Skills.Drawing());
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

    static Brewing() {
        return Skill.new("Brewing")
            .requires(Conditions.Hands());
    }

    static Distilling() {
        return Skill.new("Distilling")
            .requires(Conditions.Hands());
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