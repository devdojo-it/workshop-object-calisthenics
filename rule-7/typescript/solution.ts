class Donwloader {
    constructor(private url:string , private fileName:string) {
    }

    download() {
         console.log(`Downloading from ${this.url} to ${this.fileName}`);
    }
}

interface IFileManager {
    read();
    write();

}

class FileManager {
    path: string;
    constructor(path: string) {
        this.path = path;
    }

    readFile(fileName: string): string {
        console.log(`Reading file ${fileName} from ${this.path}`);
        return `Content of ${fileName}`;
    }

    writeFile(fileName: string, content: string): void {
        console.log(`Writing to file ${fileName} at ${this.path}`);
    }

    deleteFile(fileName: string): void {
        console.log(`Deleting file ${fileName} from ${this.path}`);
    }

    parseJsonFile(fileName: string): object {
        const content = this.readFile(fileName);
        // Stub for JSON parsing
        return { jsonObject: content };
    }

    parseXmlFile(fileName: string): object {
        const content = this.readFile(fileName);
        // Stub for XML parsing
        return { xmlObject: content };
    }

    compressFile(fileName: string): void {
        console.log(`Compressing file ${fileName}`);
    }

    uploadFile(fileName: string, destination: string): void {
        const content = this.readFile(fileName);
        console.log(`Uploading ${fileName} to ${destination}`);
    }

    download( ) {
        const donwloader = new Donwloader(..)

        downloader.downlod();
    }
} 