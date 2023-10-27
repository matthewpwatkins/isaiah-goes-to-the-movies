import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Entry from "../models/Entry";
import { parseEntry } from "../util/EntryParser";
import "./EntryDetails.css";

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | undefined>(undefined);
  const [answerIsShown, setAnswerIsShown] = useState(false);

  async function loadEntry(entryID: string) {
    const res = await fetch(`/api/${entryID}`);
    const entryText = await res.text();
    const entry = parseEntry(entryID, entryText);
    setEntry(entry);
  }

  useEffect(() => {
    loadEntry(id!);
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
        <div
          className={classNames("text-center", { invisible: answerIsShown })}
        >
          <Button size="lg" onClick={showAnswer}>
            What's Isaiah talking about?
          </Button>
        </div>
      </Card>
      <Card
        border="secondary"
        className={classNames("p-4", "mt-3", { "d-none": !answerIsShown })}
      >
        <h3>{entry?.title}</h3>
      </Card>
    </>
  );
}

export default EntryDetails;
