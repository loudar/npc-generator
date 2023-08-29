import fs from "fs";

function getFilesInDir(dir, extension) {
    let results = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });

    list.forEach(file => {
        const fullPath = dir + file.name;

        if (file.isDirectory()) {
            const subDirFiles = getFilesInDir(fullPath + "/", extension);
            results = results.concat(subDirFiles);
        } else if (file.name.endsWith(extension)) {
            results.push(fullPath);
        }
    });

    return results;
}

const dir = "./";
const files = getFilesInDir(dir, ".json");
console.log(files);

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