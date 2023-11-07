import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Entry from "../models/Entry";
import { parseEntry } from "../util/EntryParser";
import { entryIsVisited, setEntryIsVisited } from "../util/StorageManager";
import BackToListLink from "./BackToListLink";
import "./EntryDetails.css";
import { initPage } from "./PageComponent";

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>(undefined);
  const [answerIsShown, setAnswerIsShown] = useState(false);

  async function loadEntry(entryID: string) {
    initPage({ pageTitle: `Chapter ${parseInt(entryID)}` });
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

  return entry ? (
    <div className={classNames({ "d-none": !entry })}>
      <BackToListLink />
      <h2 className="display-2 text-center">Chapter {parseInt(entry.id)}</h2>
      <Card border="secondary" className="p-5 parchment my-4">
        <div className="biblical-text">
          <Markdown>{entry?.contentMarkdown}</Markdown>
        </div>
      </Card>

      <div
        className={classNames("text-center", "d-grid", {
          "d-none": answerIsShown,
        })}
      >
        <Button size="lg" onClick={showAnswer}>
          What's Isaiah talking about?
        </Button>
      </div>
      <div className={classNames({ "d-none": !answerIsShown })}>
        <div id="answer" className="text-center mb-4">
          <h1 className="display-1">{entry?.title}</h1>
          <Image src={entry?.img} fluid className="rounded-start" />
        </div>
        <BackToListLink />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default EntryDetails;
