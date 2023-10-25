import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { parse } from "yaml";
import Entry from "../models/Entry";
import Markdown from "react-markdown";
import "./EntryDetails.css";
import classNames from "classnames";

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>(undefined);
  const [answerIsShown, setAnswerIsShown] = useState(false);

  async function loadEntry() {
    const res = await fetch(`/api/${id!}`);
    const entryText = await res.text();
    const frontMatterStartIndex = entryText.indexOf("---");
    const frontMatterEndIndex = entryText.lastIndexOf("---");
    const frontMatter = entryText
      .substring(frontMatterStartIndex + 3, frontMatterEndIndex)
      .trim();
    const entry = parse(frontMatter) as Entry;
    entry.id = id!;
    entry.contentMarkdown = entryText.substring(frontMatterEndIndex + 3).trim();
    setEntry(entry);
  }

  useEffect(() => {
    loadEntry();
  }, [id]);

  function showAnswer() {
    setAnswerIsShown(true);
  }

  return (
    <>
      <Card border="secondary" className="p-4 parchment">
        <div className="biblical-text">
          <Markdown>{entry?.contentMarkdown}</Markdown>
        </div>
        <div className={classNames("text-center", { invisible: answerIsShown })}>
          <Button size="lg" onClick={showAnswer}>
            What's Isaiah talking about?
          </Button>
        </div>
      </Card>
      <Card border="secondary" className={classNames("p-4", "mt-3", { "d-none": !answerIsShown })}>
        <h3>{entry?.title}</h3>
      </Card>
    </>
  );
}

export default EntryDetails;
