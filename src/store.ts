import * as path from "path";
import * as fs from "fs";
import * as util from "util";

const readFile: (path: string) => Promise<Buffer> = util.promisify(fs.readFile);
const writeFile: (path: string, data: string) => Promise<void> = util.promisify(fs.writeFile);

let confPath = path.resolve('.bb-cli.json');

async function write(blob: any) {
    try {
        await writeFile(confPath, JSON.stringify(blob, null, '\t'));
    } catch (e) {
        console.error("Failed saving conf", e)
    }
}

async function read() {
    try {
        return JSON.parse((await readFile(confPath)).toString());
    } catch (e) {
        return {};
    }
}

export default {
    read, write
};
