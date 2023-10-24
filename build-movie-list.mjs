import fs from 'fs/promises';

const MOVIES_FOLDER = "_entries";
const INDEX_FILE_NAME = "./public/entries.json";

fs.rm(INDEX_FILE_NAME, { force: true });

const entries = (await fs.readdir(MOVIES_FOLDER)).map(fileName => {
  return {
    id: fileName.replace(".md", "")
  };
});
await fs.writeFile(INDEX_FILE_NAME, JSON.stringify(entries, undefined, '  '));

console.log(`Done writing index. Size: ${entries.length}`);