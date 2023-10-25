import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { parse } from "yaml";
import Entry from "../models/Entry";
import Markdown from "react-markdown";

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>(undefined);

  async function loadEntry() {
    const res = await fetch(`/api/${id!}`);
    const entryText = await res.text();
    const frontMatterStartIndex = entryText.indexOf('---');
    const frontMatterEndIndex = entryText.lastIndexOf('---');
    const frontMatter = entryText.substring(frontMatterStartIndex + 3, frontMatterEndIndex).trim();
    const entry = parse(frontMatter) as Entry;
    entry.id = id!;
    entry.contentMarkdown = entryText.substring(frontMatterEndIndex + 3).trim();
    setEntry(entry);
  }

  useEffect(() => {
    loadEntry();
  }, [id]);

  return <Card border="secondary" className="p-3 mb-5">
    <Markdown>{entry?.contentMarkdown}</Markdown>
  </Card>;
}

export default EntryDetails;
