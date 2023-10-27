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
    setTimeout(() => document.querySelector("#answer")!.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
  }

  return (
    <>
      <Card border="secondary" className="p-4 parchment mb-4">
        <div className="biblical-text">
          <Markdown>{entry?.contentMarkdown}</Markdown>
        </div>
      </Card>
    
      <div className={classNames("text-center", { "d-none": answerIsShown })}>
        <Button size="lg" onClick={showAnswer}>
          What's Isaiah talking about?
        </Button>
      </div>
      <div className="text-center">
        <Image id="answer" src={entry?.img} rounded fluid className={classNames("p-4", "mt-3", { "d-none": !answerIsShown })} style={{ maxWidth: "500px" }} />
      </div>
    </>
  );
}

export default EntryDetails;
