import { parse } from "yaml";
import Chapter from "../models/Chapter";
import ChapterHeading from "../models/ChapterHeading";

export function parseChapterHeading(
  numberID: string,
  frontMatter: string
): ChapterHeading {
  const heading = parse(frontMatter) as ChapterHeading;
  heading.numberID = numberID;
  heading.number = parseInt(numberID);
  return heading;
}

function splitChapter(fullMarkdown: string): string[] {
  const frontMatterStartIndex = fullMarkdown.indexOf("---");
  const frontMatterEndIndex = fullMarkdown.lastIndexOf("---");
  const frontMatter = fullMarkdown
    .substring(frontMatterStartIndex + 3, frontMatterEndIndex)
    .trim();
  const contentMarkdown = fullMarkdown
    .substring(frontMatterEndIndex + 3)
    .trim();
  return [frontMatter, contentMarkdown];
}

export function parseChapter(numberID: string, fullMarkdown: string): Chapter {
  const [frontMatter, contentMarkdown] = splitChapter(fullMarkdown);
  return {
    heading: parseChapterHeading(numberID, frontMatter),
    contentMarkdown: contentMarkdown,
  };
}
