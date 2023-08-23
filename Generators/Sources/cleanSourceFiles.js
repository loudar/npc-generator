import * as fs from "fs";

const dir = "./";
const files = fs.readdirSync(dir).filter(file => file.endsWith(".json"));

console.log("Cleaning source files...");
let done = 0;
files.forEach(file => {
    const content = fs.readFileSync(dir + file);
    const source = JSON.parse(content.toString());
    const toRemoveCount = source.entries.length - source.entries.filter((entry, index, self) => self.findIndex(e => e === entry) === index).length;
    source.entries = source.entries.filter((entry, index, self) => self.findIndex(e => e === entry) === index);
    fs.writeFileSync(dir + file, JSON.stringify(source, null, 4));
    done++;
    console.log(` -> ${file} done (${done}/${files.length}) (${toRemoveCount} entries removed)`);
});

console.log("Done.");