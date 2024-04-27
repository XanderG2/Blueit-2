import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
const STORE_FILE = `${__dirname}/../store.json`;

async function saveFile() {
  await writeFile(STORE_FILE, JSON.stringify(data));
}

function loadfile() {
  try {
    const data = readFileSync(STORE_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return Object.create(null);
  }
}

const data = loadfile();

export class Database {
  async get(key: string): Promise<any> {
    return data[key];
  }
  async set(key: string, value: any) {
    data[key] = value;
    await saveFile();
  }
  async list(prefix: string) {
    return Object.keys(data).filter((key) => key.startsWith(prefix));
  }
}
