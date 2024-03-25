export class CLI {
    static writeWithColor(text, color, newLine = true) {
        process.stdout.write(`\x1b[${color}m${text}\x1b[0m${newLine ? "\n" : ""}`);
    }

    static writeError(text, newLine = true) {
        this.writeWithColor(text, 31, newLine);
    }

    static writeWarning(text, newLine = true) {
        this.writeWithColor(text, 33, newLine);
    }

    static writeInfo(text, newLine = true) {
        this.writeWithColor(text, 36, newLine);
    }

    static writeSuccess(text, newLine = true) {
        this.writeWithColor(text, 32, newLine);
    }

    static writeDebug(text, newLine = true) {
        this.writeWithColor(text, 35, newLine);
    }

    static write(text, newLine = true) {
        process.stdout.write(text + (newLine ? "\n" : ""));
    }

    static sameLineDiff(tokens, compareTokens) {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === compareTokens[i]) {
                CLI.writeError(compareTokens[i] + " ", false);
            } else {
                CLI.writeSuccess(tokens[i] + " ", false);
            }
        }
    }

    static rewrite(text) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(text);
    }
}