const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { parse, generate } = require('abstract-syntax-tree');
const path = require('path');

import VariableRenamer from "./VariableRenamer";

interface ProcessedFile {
    inputFile: string;
    code: string;
}

export default class FileProcessor {
    private inputFolder: string;
    private outputFolder: string;
    private variableRenamer: VariableRenamer;

    constructor(inputFolder: string, outputFolder: string, variableRenamer: VariableRenamer) {
        this.inputFolder = inputFolder;
        this.outputFolder = outputFolder;
        this.variableRenamer = variableRenamer;
    }

    private processFile(file: string): ProcessedFile {
        const inputFile = path.join(this.inputFolder, file);
        const code = readFileSync(inputFile, 'utf-8');
        console.log('Processing file: ' + file);
        return { inputFile, code };
    }

    private generateOutputFile(inputFile: string, file: string): string {
        let outputFile = path.join(this.outputFolder, file);
        outputFile = outputFile.replace(/entity/g, 'premenovane');
        outputFile = outputFile.replace(/Entity/g, 'Premenovane');
        return outputFile;
    }

    private writeModifiedCode(outputFile: string, modifiedCode: string): void {
        writeFileSync(outputFile, modifiedCode, 'utf-8');
        console.log(`File processed and saved to: ${outputFile}`);
    }

    public processFiles(): void {
        const files = readdirSync(this.inputFolder);
        for (const file of files) {
            if (this.shouldProcessFile(file)) {
                const { inputFile, code } = this.processFile(file);
                const modifiedCode = this.renameCode(code, file);
                const outputFile = this.generateOutputFile(inputFile, file);
                this.writeModifiedCode(outputFile, modifiedCode);
            }
        }
    }

    shouldProcessFile(file: string): boolean {
        return file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.jsx');
    }

    private renameCode(code: string, file: string): string {
        const ast = parse(code, {
            ecmaVersion: 2019,
            sourceType: 'module',
            loc: true,
            range: true,
            jsx: file.endsWith('.tsx') || file.endsWith('.jsx'),
        });

        this.variableRenamer.rename(ast);
        return generate(ast);
    }
}