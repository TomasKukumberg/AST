import CodeRenamer from './src/CodeRenamer';

if (process.argv.length < 4) {
    console.error('Usage: node script.js <inputFolder> <outputFolder>');
    process.exit(1);
}

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];
const codeRenamer = new CodeRenamer(inputFolder, outputFolder);
codeRenamer.processFiles();
