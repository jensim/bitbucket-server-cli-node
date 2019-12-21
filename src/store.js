import path from "path";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let confPath = path.resolve('.bb-cli.json');

async function write(blob) {
    try {
        await writeFile(confPath, JSON.stringify(blob, null, '\t'));
    }catch (e) {
        console.error("Failed saving conf", e)
    }
}

async function read() {
    try {
        return JSON.parse(await readFile(confPath));
    } catch (e) {
        //console.error("Failed loading conf", e);
        return {};
    }
}

export default {
    read, write
};
