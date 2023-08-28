import {Skill} from "./Skill.mjs";
import {PhysicalSkills} from "./PhysicalSkills.mjs";

export class MentalSkills {
    static Logic() {
        return Skill.new("Logic");
    }

    static Hospitality() {
        return Skill.new("Hospitality");
    }

    static Charisma() {
        return Skill.new("Charisma");
    }

    static Patience() {
        return Skill.new("Patience");
    }

    static Negotiation() {
        return Skill.new("Negotiation")
            .addSubskill(MentalSkills.Logic())
            .addSubskill(MentalSkills.Charisma());
    }

    static Creativity() {
        return Skill.new("Creativity");
    }

    static Astrology() {
        return Skill.new("Astrology");
    }

    static Astronomy() {
        return Skill.new("Astronomy")
            .addSubskill(PhysicalSkills.Sight());
    }

    static Engineering() {
        return Skill.new("Engineering")
            .addSubskill(MentalSkills.Mathematics())
            .addSubskill(PhysicalSkills.Drawing());
    }

    static Finance() {
        return Skill.new("Finance");
    }

    static Mathematics() {
        return Skill.new("Mathematics")
            .addSubskill(MentalSkills.Understanding())
            .addSubskill(MentalSkills.Literacy())
            .addSubskill(MentalSkills.Logic());
    }

    static Literacy() {
        return Skill.new("Literacy")
            .addSubskill(PhysicalSkills.Read())
            .addSubskill(PhysicalSkills.Write());
    }

    static Research() {
        return Skill.new("Research")
            .addSubskill(MentalSkills.Understanding())
            .addSubskill(MentalSkills.Literacy());
    }

    static Understanding() {
        return Skill.new("Understanding");
    }

    static Cartography() {
        return Skill.new("Cartography")
            .addSubskill(MentalSkills.Mathematics())
            .addSubskill(PhysicalSkills.Drawing());
    }

    static Belief() {
        return Skill.new("Belief");
    }

    static Herbalism() {
        return Skill.new("Herbalism");
    }

    static Prospecting() {
        return Skill.new("Prospecting");
    }

    static Medicine() {
        return Skill.new("Medicine")
            .addSubskill(MentalSkills.Research())
            .addSubskill(MentalSkills.Understanding())
            .addSubskill(MentalSkills.Literacy())
            .addSubskill(MentalSkills.Logic())
            .addSubskill(MentalSkills.Herbalism());
    }
}