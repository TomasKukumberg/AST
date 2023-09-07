import FileProcessor from './FileProcessor';
import VariableRenamer from './VariableRenamer';

export default class CodeRenamer {
    private fileProcessor: FileProcessor;
    private variableRenamer: VariableRenamer;

    constructor(inputFolder: string, outputFolder: string) {
        this.variableRenamer = new VariableRenamer();
        this.fileProcessor = new FileProcessor(inputFolder, outputFolder, this.variableRenamer);
    }

    processFiles(): void {
        this.fileProcessor.processFiles();
    }
}