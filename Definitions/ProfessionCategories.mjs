import {Profession} from "./Profession.mjs";
import {ProfessionCategory} from "./ProfessionCategory.mjs";
import {Skill} from "./Skills/Skill.mjs";
import {PhysicalSkills} from "./Skills/PhysicalSkills.mjs";
import {MentalSkills} from "./Skills/MentalSkills.mjs";

export class ProfessionCategories {
    static WOOD() {
        return new ProfessionCategory("Wood")
            .addProfession(
                new Profession("Woodcutter")
                    .addSkill(PhysicalSkills.Woodcutting())
            )
            .addProfession(
                new Profession("Carpenter")
                    .addSkill(PhysicalSkills.Woodcutting())
                    .addSkill(PhysicalSkills.Carpentry())
            )
            .addProfession(
                new Profession("Bowyer")
                    .addSkill(PhysicalSkills.Woodcutting())
                    .addSkill(PhysicalSkills.Bowcraft())
            )
            .addProfession(
                new Profession("Fletcher")
                    .addSkill(PhysicalSkills.Woodcutting())
                    .addSkill(PhysicalSkills.Bowcraft())
            )
            .addProfession(
                new Profession("Lumberjack")
                    .addSkill(PhysicalSkills.Woodcutting())
                    .addSkill(PhysicalSkills.Logging())
            )
            .addProfession(
                new Profession("Sawyer")
                    .addSkill(PhysicalSkills.Woodcutting())
                    .addSkill(PhysicalSkills.Logging())
                    .addSkill(PhysicalSkills.Carpentry())
            )
    }

    static METAL() {
        return new ProfessionCategory("Metal")
            .addProfession(
                new Profession("Miner")
                    .addSkill(PhysicalSkills.Mining())
            )
            .addProfession(
                new Profession("Blacksmith")
                    .addSkill(PhysicalSkills.Smithing())
            )
            .addProfession(
                new Profession("Armorer")
                    .addSkill(PhysicalSkills.Smithing())
                    .addSkill(PhysicalSkills.Armorsmithing())
            )
            .addProfession(
                new Profession("Weaponsmith")
                    .addSkill(PhysicalSkills.Smithing())
                    .addSkill(PhysicalSkills.Weaponsmithing())
            )
            .addProfession(
                new Profession("Jeweler")
                    .addSkill(PhysicalSkills.Smithing())
                    .addSkill(PhysicalSkills.Jewelcrafting())
            )
            .addProfession(
                new Profession("Prospector")
                    .addSkill(PhysicalSkills.Mining())
                    .addSkill(MentalSkills.Prospecting())
            )
            .addProfession(
                new Profession("Smith")
                    .addSkill(PhysicalSkills.Smithing())
            )
    }

    static LEATHER() {
        return new ProfessionCategory("Leather")
            .addProfession(
                new Profession("Tanner")
                    .addSkill(PhysicalSkills.Tanning())
            )
            .addProfession(
                new Profession("Leatherworker")
                    .addSkill(PhysicalSkills.Tanning())
                    .addSkill(PhysicalSkills.Leatherworking())
            )
            .addProfession(
                new Profession("Tailor")
                    .addSkill(PhysicalSkills.Tailoring())
                    .addSkill(PhysicalSkills.Sewing())
            )
            .addProfession(
                new Profession("Furrier")
                    .addSkill(PhysicalSkills.Tanning())
                    .addSkill(PhysicalSkills.Leatherworking())
                    .addSkill(PhysicalSkills.Sewing())
            )
            .addProfession(
                new Profession("Saddler")
                    .addSkill(PhysicalSkills.Tanning())
                    .addSkill(PhysicalSkills.Leatherworking())
                    .addSkill(PhysicalSkills.Sewing())
            )
            .addProfession(
                new Profession("Skinner")
                    .addSkill(PhysicalSkills.Tanning())
                    .addSkill(PhysicalSkills.Skinning())
            )
    }

    static FOOD() {
        return new ProfessionCategory("Food")
            .addProfession(
                new Profession("Farmer")
                    .addSkill(PhysicalSkills.Farming())
            )
            .addProfession(
                new Profession("Cook")
                    .addSkill(PhysicalSkills.Cooking())
                    .addSkill(PhysicalSkills.Cutting())
                    .addSkill(PhysicalSkills.Baking())
                    .addSkill(MentalSkills.Herbalism())
            )
            .addProfession(
                new Profession("Baker")
                    .addSkill(new Skill("Baking"))
            )
            .addProfession(
                new Profession("Butcher")
                    .addSkill(PhysicalSkills.Cutting())
                    .addSkill(PhysicalSkills.Skinning())
                    .addSkill(PhysicalSkills.Hammering())
            )
            .addProfession(
                new Profession("Fisherman")
                    .addSkill(PhysicalSkills.Fishing())
            )
            .addProfession(
                new Profession("Brewer")
                    .addSkill(PhysicalSkills.Brewing())
            )
            .addProfession(
                new Profession("Vintner")
                    .addSkill(PhysicalSkills.Brewing())
            )
            .addProfession(
                new Profession("Gardener")
                    .addSkill(PhysicalSkills.Farming())
                    .addSkill(PhysicalSkills.Gardening())
            )
            .addProfession(
                new Profession("Herbalist")
                    .addSkill(PhysicalSkills.Farming())
                    .addSkill(PhysicalSkills.Gardening())
                    .addSkill(MentalSkills.Herbalism())
            )
            .addProfession(
                new Profession("Miller")
                    .addSkill(PhysicalSkills.Farming())
                    .addSkill(PhysicalSkills.Milling())
            )
            .addProfession(
                new Profession("Beekeeper")
                    .addSkill(PhysicalSkills.AnimalHusbandry())
                    .addSkill(PhysicalSkills.Beekeeping())
            )
            .addProfession(
                new Profession("Cheesemaker")
                    .addSkill(PhysicalSkills.AnimalHusbandry())
                    .addSkill(PhysicalSkills.Cheesemaking())
            )
            .addProfession(
                new Profession("Dairyman")
                    .addSkill(PhysicalSkills.AnimalHusbandry())
            )
            .addProfession(
                new Profession("Distiller")
                    .addSkill(PhysicalSkills.Brewing())
                    .addSkill(PhysicalSkills.Distilling())
            )
            .addProfession(
                new Profession("Meadmaker")
                    .addSkill(PhysicalSkills.Brewing())
                    .addSkill(PhysicalSkills.Distilling())
            )
    }

    static SERVICE() {
        return new ProfessionCategory("Service")
            .addProfession(
                new Profession("Server")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma().optional())
                    .addSkill(PhysicalSkills.Balance().optional())
                    .addSkill(MentalSkills.Patience().optional())
            )
            .addProfession(
                new Profession("Storeclerk")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma().optional())
                    .addSkill(MentalSkills.Negotiation().optional())
                    .addSkill(MentalSkills.Patience().optional())
            )
            .addProfession(
                new Profession("Bartender")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma().optional())
                    .addSkill(PhysicalSkills.Balance().optional())
                    .addSkill(PhysicalSkills.Mixing().optional())
            )
            .addProfession(
                new Profession("Innkeeper")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma())
                    .addSkill(PhysicalSkills.Mixing().optional())
                    .addSkill(MentalSkills.Hospitality())
                    .addSkill(PhysicalSkills.Cooking())
            )
            .addProfession(
                new Profession("Merchant")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma().optional())
                    .addSkill(MentalSkills.Negotiation())
                    .addSkill(MentalSkills.Finance())
            )
            .addProfession(
                new Profession("Banker")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma().optional())
                    .addSkill(MentalSkills.Finance())
                    .addSkill(MentalSkills.Mathematics())
                    .addSkill(MentalSkills.Negotiation())
            )
            .addProfession(
                new Profession("Scribe")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(PhysicalSkills.Listening())
            )
            .addProfession(
                new Profession("Scholar")
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
            )
            .addProfession(
                new Profession("Librarian")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
            )
            .addProfession(
                new Profession("Mathematician")
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Mathematics())
            )
            .addProfession(
                new Profession("Teacher")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research())
                    .addSkill(MentalSkills.Authority())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Patience().optional())
            )
            .addProfession(
                new Profession("Student")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(PhysicalSkills.Writing())
            )
            .addProfession(
                new Profession("Professor")
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Patience())
            )
            .addProfession(
                new Profession("Philosopher")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(PhysicalSkills.Calligraphy())
                    .addSkill(MentalSkills.Patience())
            )
            .addProfession(
                new Profession("Priest")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Belief())
                    .addSkill(MentalSkills.Patience())
            )
            .addProfession(
                new Profession("Politician")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Charisma())
                    .addSkill(MentalSkills.Negotiation())
                    .addSkill(MentalSkills.Patience())
            )
            .addProfession(
                new Profession("Sage")
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research())
                    .addSkill(PhysicalSkills.Calligraphy())
                    .addSkill(MentalSkills.Patience())
            )
            .addProfession(
                new Profession("Apothecary")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(PhysicalSkills.Calligraphy())
                    .addSkill(MentalSkills.Herbalism())
            )
            .addProfession(
                new Profession("Physician")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Literacy())
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(MentalSkills.Herbalism())
                    .addSkill(PhysicalSkills.Surgery())
            )
            .addProfession(
                new Profession("Alchemist")
                    .addSkill(MentalSkills.Literacy().optional())
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Creativity())
                    .addSkill(MentalSkills.Herbalism())
                    .addSkill(MentalSkills.Alchemy())
            )
            .addProfession(
                new Profession("Astrologer")
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Mathematics().optional())
                    .addSkill(MentalSkills.Creativity())
                    .addSkill(MentalSkills.Astrology())
            )
            .addProfession(
                new Profession("Astronomer")
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(PhysicalSkills.Calligraphy().optional())
                    .addSkill(MentalSkills.Mathematics().optional())
                    .addSkill(MentalSkills.Astronomy())
            )
            .addProfession(
                new Profession("Cartographer")
                    .addSkill(MentalSkills.Research().optional())
                    .addSkill(MentalSkills.Cartography())
            )
            .addProfession(
                new Profession("Engineer")
                    .addSkill(MentalSkills.Research())
                    .addSkill(PhysicalSkills.Drawing())
                    .addSkill(MentalSkills.Engineering())
            )
            .addProfession(
                new Profession("Architect")
                    .addSkill(MentalSkills.Research())
                    .addSkill(PhysicalSkills.Drawing())
                    .addSkill(MentalSkills.Creativity().optional())
            )
            .addProfession(
                new Profession("Doctor")
                    .addSkill(PhysicalSkills.Listening())
                    .addSkill(PhysicalSkills.Speaking())
                    .addSkill(MentalSkills.Medicine())
            )
    }
}