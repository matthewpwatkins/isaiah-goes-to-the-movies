import { parse } from "yaml";
import Entry from "../models/Entry";

export function parseEntry(id: string, entryMarkdown: string) {
  const frontMatterStartIndex = entryMarkdown.indexOf("---");
  const frontMatterEndIndex = entryMarkdown.lastIndexOf("---");
  const frontMatter = entryMarkdown
    .substring(frontMatterStartIndex + 3, frontMatterEndIndex)
    .trim();
  const entry = parse(frontMatter) as Entry;
  entry.id = id;
  entry.contentMarkdown = entryMarkdown.substring(frontMatterEndIndex + 3).trim();
  return entry;
}