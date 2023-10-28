import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Entry from "../models/Entry";
import { parseEntry } from "../util/EntryParser";
import "./EntryDetails.css";
import Image from "react-bootstrap/Image";
import { entryIsVisited, setEntryIsVisited } from "../util/StorageManager";
import BackToListLink from "./BackToListLink";

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>(undefined);
  const [answerIsShown, setAnswerIsShown] = useState(false);

  async function loadEntry(entryID: string) {
    const res = await fetch(`/api/${entryID}`);
    const entryText = await res.text();
    const entry = parseEntry(entryID, entryText);
    entry.visited = entryIsVisited(entryID);
    setEntry(entry);
    setAnswerIsShown(entry.visited);
  }

  useEffect(() => {
    loadEntry(id!);
  }, [id]);

  function showAnswer() {
    setAnswerIsShown(true);
    setEntryIsVisited(id!, true);
    setTimeout(
      () =>
        document
          .querySelector("#answer")!
          .scrollIntoView({ behavior: "smooth", block: "center" }),
      250
    );
  }

  return (
    <div
      style={{ maxWidth: "640px", margin: "auto" }}
      className={classNames({ "d-none": !entry })}
    >
      <BackToListLink />
      <Card border="secondary" className="p-4 parchment my-4">
        <div className="biblical-text">
          <Markdown>{entry?.contentMarkdown}</Markdown>
        </div>
      </Card>

      <div className={classNames("text-center", { "d-none": answerIsShown })}>
        <Button size="lg" onClick={showAnswer}>
          What's Isaiah talking about?
        </Button>
      </div>
      <div
        id="answer"
        className={classNames("text-center", "mb-4", { "d-none": !answerIsShown })}
      >
        <h1 className="display-1">{entry?.title}</h1>
        <Image src={entry?.img} fluid className="rounded-start" />
      </div>
      <BackToListLink />
    </div>
  );
}

export default EntryDetails;
