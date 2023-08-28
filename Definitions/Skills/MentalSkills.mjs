import {Skill} from "./Skill.mjs";
import {PhysicalSkills} from "./PhysicalSkills.mjs";

export class MentalSkills {
    static Logic() {
        return new Skill("Logic");
    }

    static Hospitality() {
        return new Skill("Hospitality");
    }

    static Charisma() {
        return new Skill("Charisma");
    }

    static Patience() {
        return new Skill("Patience");
    }

    static Negotiation() {
        return new Skill("Negotiation")
            .addSubskill(MentalSkills.Logic())
            .addSubskill(PhysicalSkills.Speaking())
            .addSubskill(MentalSkills.Charisma());
    }

    static Creativity() {
        return new Skill("Creativity");
    }

    static Astrology() {
        return new Skill("Astrology");
    }

    static Astronomy() {
        return new Skill("Astronomy")
            .addSubskill(PhysicalSkills.Sight());
    }

    static Engineering() {
        return new Skill("Engineering")
            .addSubskill(MentalSkills.Mathematics())
            .addSubskill(PhysicalSkills.Drawing());
    }

    static Finance() {
        return new Skill("Finance");
    }

    static Mathematics() {
        return new Skill("Mathematics")
            .addSubskill(MentalSkills.Understanding())
            .addSubskill(MentalSkills.Literacy())
            .addSubskill(MentalSkills.Logic());
    }

    static Literacy() {
        return new Skill("Literacy")
            .addSubskill(PhysicalSkills.Read())
            .addSubskill(PhysicalSkills.Writing());
    }

    static Research() {
        return new Skill("Research")
            .addSubskill(MentalSkills.Understanding())
            .addSubskill(MentalSkills.Literacy());
    }

    static Authority() {
        return new Skill("Authority");
    }

    static Understanding() {
        return new Skill("Understanding");
    }

    static Cartography() {
        return new Skill("Cartography")
            .addSubskill(MentalSkills.Mathematics())
            .addSubskill(PhysicalSkills.Drawing());
    }

    static Belief() {
        return new Skill("Belief");
    }

    static Herbalism() {
        return new Skill("Herbalism");
    }

    static Prospecting() {
        return new Skill("Prospecting");
    }

    static Medicine() {
        return new Skill("Medicine")
            .addSubskill(MentalSkills.Research())
            .addSubskill(MentalSkills.Understanding())
            .addSubskill(MentalSkills.Literacy())
            .addSubskill(MentalSkills.Logic())
            .addSubskill(MentalSkills.Herbalism());
    }

    static Alchemy() {
        return new Skill("Alchemy");
    }
}