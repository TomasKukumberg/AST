import FileProcessor from './FileProcessor';

export default class CodeRenamer {
    private fileProcessor: FileProcessor;

    constructor(inputFolder: string, outputFolder: string) {
        this.fileProcessor = new FileProcessor(inputFolder, outputFolder);
    }

    processFiles(): void {
        this.fileProcessor.processFiles();
    }
}