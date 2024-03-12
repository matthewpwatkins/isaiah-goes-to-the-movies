import fs from "fs";
import fsAsync from "fs/promises";
import path from "path";
import { parseChapter } from "./src/util/ChapterParser.js";
import https from "https";

const SRC_ENTRIES_FOLDER = "./_chapters";
const PUBLIC_FOLDER = "./public";
const DST_DATA_FOLDER = path.join(PUBLIC_FOLDER, "data");
const DST_CHAPTERS_FOLDER = path.join(DST_DATA_FOLDER, "chapters");
const DST_CHAPTER_IMAGES_FOLDER = path.join(DST_DATA_FOLDER, "chapter-images");
const DST_CHAPTER_LISTINGS_FILE_PATH = path.join(DST_CHAPTERS_FOLDER, "_list");
const DST_SITEMAP_TXT_FILE_PATH = path.join(PUBLIC_FOLDER, "sitemap.txt");
const DST_SITEMAP_XML_FILE_PATH = path.join(PUBLIC_FOLDER, "sitemap.xml");

// Wipe out existing pre-build assets
await fsAsync.rm(DST_DATA_FOLDER, { recursive: true, force: true });
await fsAsync.rm(DST_SITEMAP_TXT_FILE_PATH, { force: true });
await fsAsync.mkdir(DST_DATA_FOLDER);
await fsAsync.mkdir(DST_CHAPTERS_FOLDER);
await fsAsync.mkdir(DST_CHAPTER_IMAGES_FOLDER);

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

const siteMap = ["https://isaiahgoestothemovies.com"];
siteMap.push(`${siteMap[0]}/sitemap.txt`);
siteMap.push(`${siteMap[0]}/sitemap.xml`);
siteMap.push(`${siteMap[0]}/favicon-32x32.png`);

const chapterListings = [];
for (const fileName of await fsAsync.readdir(SRC_ENTRIES_FOLDER)) {
  const sourceFilePath = path.join(SRC_ENTRIES_FOLDER, fileName);
  const entryMarkdown = await fsAsync.readFile(sourceFilePath, "utf8");
  const numberID = fileName.split("-")[0];
  siteMap.push(`${siteMap[0]}/chapters/${numberID}`);
  const chapter = parseChapter(numberID, entryMarkdown);
  await fsAsync.copyFile(
    sourceFilePath,
    path.join(DST_CHAPTERS_FOLDER, numberID)
  );
  const entryImageDestinationFilePath = path.join(
    DST_CHAPTER_IMAGES_FOLDER,
    `${numberID}.jpg`
  );
  console.log(
    `Downloading ${chapter.heading.imgSrc} => ${entryImageDestinationFilePath}`
  );
  await downloadFile(chapter.heading.imgSrc, entryImageDestinationFilePath);
  chapterListings.push(chapter.heading);
}

await fsAsync.writeFile(
  DST_CHAPTER_LISTINGS_FILE_PATH,
  JSON.stringify(chapterListings)
);
console.log(`Done writing index. Size: ${chapterListings.length}`);

await fsAsync.writeFile(DST_SITEMAP_TXT_FILE_PATH, siteMap.join("\n") + "\n");
await fsAsync.writeFile(
  DST_SITEMAP_XML_FILE_PATH,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteMap.join(`</loc>
  </url>
  <url>
    <loc>`)}</loc>
  </url>
</urlset>`
);
console.log("Done writing sitemaps");
