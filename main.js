"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CodeRenamer_1 = require("./src/CodeRenamer");
if (process.argv.length < 4) {
    console.error('Usage: node script.js <inputFolder> <outputFolder>');
    process.exit(1);
}
var inputFolder = process.argv[2];
var outputFolder = process.argv[3];
var codeRenamer = new CodeRenamer_1.default(inputFolder, outputFolder);
codeRenamer.processFiles();
