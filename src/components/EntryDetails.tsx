import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Entry from "../models/Entry";
import { parseEntry } from "../util/EntryParser";
import "./EntryDetails.css";
import Image from "react-bootstrap/Image";

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
        <div className={classNames("text-center", { invisible: answerIsShown })}>
          <Button size="lg" onClick={showAnswer}>
            What's Isaiah talking about?
          </Button>
        </div>
      </Card>
    
      <div className="text-center">
        <Image src={entry?.img} rounded fluid className={classNames("p-4", "mt-3", { "d-none": !answerIsShown })} style={{ maxWidth: "500px" }} />
      </div>
    </>
  );
}

export default EntryDetails;
