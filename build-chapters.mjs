import fs from "fs";
import fsAsync from "fs/promises";
import path from "path";
import { parseChapter } from "./src/util/ChapterParser.js";
import https from "https";

const SRC_ENTRIES_FOLDER = "./_chapters";
const DST_DATA_FOLDER = path.join("./public", "data");
const DST_API_FOLDER = path.join(DST_DATA_FOLDER, "chapters");
const DST_ENTRY_IMAGE_FOLDER = path.join(DST_DATA_FOLDER, "chapter-images");
const ENTRY_INDEX_FILE_PATH = path.join(DST_API_FOLDER, "_list");

await fsAsync.rm(DST_DATA_FOLDER, { recursive: true, force: true });
await fsAsync.mkdir(DST_DATA_FOLDER);
await fsAsync.mkdir(DST_API_FOLDER);
await fsAsync.mkdir(DST_ENTRY_IMAGE_FOLDER);

const downloadFile = async (url, destinationFilePath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationFilePath);
    https
      .get(url, (res) => {
        res.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(destinationFilePath);
        reject(err);
      });
  });
};

const chapterListings = [];
for (const fileName of await fsAsync.readdir(SRC_ENTRIES_FOLDER)) {
  const sourceFilePath = path.join(SRC_ENTRIES_FOLDER, fileName);
  const entryMarkdown = await fsAsync.readFile(sourceFilePath, "utf8");
  const secretID = fileName.split("-")[0];
  const chapter = parseChapter(secretID, entryMarkdown);
  await fsAsync.copyFile(sourceFilePath, path.join(DST_API_FOLDER, secretID));
  const entryImageDestinationFilePath = path.join(
    DST_ENTRY_IMAGE_FOLDER,
    `${secretID}.jpg`
  );
  console.log(
    `Downloading ${chapter.heading.imgSrc} => ${entryImageDestinationFilePath}`
  );
  await downloadFile(chapter.heading.imgSrc, entryImageDestinationFilePath);
  chapterListings.push(chapter.heading);
}

await fsAsync.writeFile(ENTRY_INDEX_FILE_PATH, JSON.stringify(chapterListings));

console.log(`Done writing index. Size: ${chapterListings.length}`);
