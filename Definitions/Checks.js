export class Checks {
    static bodyPartState(character, bodyPart, state) {
        return character.body.has(bodyPart) && character.getBodypart(bodyPart).state === state;
    }
}