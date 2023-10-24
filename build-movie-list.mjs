import fs from 'fs/promises';
import path from 'path';

const SRC_ENTRIES_FOLDER = "./_entries";
const DST_API_FOLDER = path.join("./public", "api");
const ENTRY_INDEX_FILE_PATH = path.join(DST_API_FOLDER, "list-entries");

fs.rmdir(DST_API_FOLDER);
fs.mkdir(DST_API_FOLDER);

const entries = [];
for (const fileName of await fs.readdir(SRC_ENTRIES_FOLDER)) {
  const id = fileName.replace(".md", "");
  await fs.copyFile(path.join(SRC_ENTRIES_FOLDER, fileName), path.join(DST_API_FOLDER, id));
  entries.push({ id: id });
}
await fs.writeFile(ENTRY_INDEX_FILE_PATH, JSON.stringify(entries, undefined, '  '));

console.log(`Done writing index. Size: ${entries.length}`);
