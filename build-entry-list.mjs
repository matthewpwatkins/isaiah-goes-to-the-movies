import fs from "fs/promises";
import path from "path";
import { parseEntry } from "./src/util/EntryParser.js";

const SRC_ENTRIES_FOLDER = "./_entries";
const DST_API_FOLDER = path.join("./public", "api");
const ENTRY_INDEX_FILE_PATH = path.join(DST_API_FOLDER, "list-entries");

await fs.rm(DST_API_FOLDER, { recursive: true, force: true });
await fs.mkdir(DST_API_FOLDER);

const entries = [];
for (const fileName of await fs.readdir(SRC_ENTRIES_FOLDER)) {
  const sourceFilePath = path.join(SRC_ENTRIES_FOLDER, fileName);
  const entryMarkdown = await fs.readFile(sourceFilePath, "utf8");
  const id = fileName.split("-")[0];
  const { img } = parseEntry(id, entryMarkdown);
  await fs.copyFile(sourceFilePath, path.join(DST_API_FOLDER, id));
  entries.push({ id, img });
}
await fs.writeFile(
  ENTRY_INDEX_FILE_PATH,
  JSON.stringify(entries, undefined, "  ")
);

console.log(`Done writing index. Size: ${entries.length}`);
