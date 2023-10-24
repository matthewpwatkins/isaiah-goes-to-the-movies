import fs from 'fs/promises';
import path from 'path';

const MOVIES_FOLDER = "_entries";
const INDEX_FILE_NAME = "_index.jsonl";
const MOVIE_INDEX_FILE_PATH = path.join(MOVIES_FOLDER, INDEX_FILE_NAME);

fs.rm(MOVIE_INDEX_FILE_PATH, { force: true });

const fileNames = (await fs.readdir(MOVIES_FOLDER)).filter(f => f.endsWith(".md"));
for (let i = 0; i < fileNames.length; i++) {
  if (i) {
    await fs.appendFile(MOVIE_INDEX_FILE_PATH, "\n");
  }
  await fs.appendFile(MOVIE_INDEX_FILE_PATH, JSON.stringify({
    id: fileNames[i].replace(".md", "")
  }));
}

console.log(`Done writing ${fileNames.length} file(s)`);