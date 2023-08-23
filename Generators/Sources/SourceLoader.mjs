import * as fs from "fs";

export class SourceLoader {
    static get(sourceName) {
        const relativePath = "./Generators/Sources/" + sourceName + ".json";
        const content = fs.readFileSync(relativePath);
        const source = JSON.parse(content.toString());
        return source.entries;
    }
}