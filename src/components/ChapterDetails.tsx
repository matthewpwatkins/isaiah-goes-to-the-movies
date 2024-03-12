import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import Chapter from "../models/Chapter";
import { chapterIsVisited, setChapterIsVisited } from "../util/StorageManager";
import BackToListLink from "./BackToListLink";
import "./ChapterDetails.css";
import { initPage } from "./PageComponent";
import { parseChapter } from "../util/ChapterParser";
import remarkGfm from "remark-gfm";

function ChapterDetails() {
  const { id } = useParams();
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);
  const [answerIsShown, setAnswerIsShown] = useState(false);

  async function loadChapter(entryID: string) {
    initPage({ pageTitle: `Chapter ${parseInt(entryID)}` });
    const res = await fetch(`/data/chapters/${entryID}`);
    const chapterText = await res.text();
    const chapter = parseChapter(entryID, chapterText);
    chapter.heading.visited = chapterIsVisited(entryID);
    setChapter(chapter);
    setAnswerIsShown(chapter.heading.visited);
  }

  useEffect(() => {
    loadChapter(id!);
  }, [id]);

  function showAnswer() {
    setAnswerIsShown(true);
    setChapterIsVisited(id!, true);
    setTimeout(
      () =>
        document
          .querySelector("#answer")!
          .scrollIntoView({ behavior: "smooth", block: "center" }),
      250
    );
  }

  return chapter ? (
    <div className={classNames({ "d-none": !chapter })}>
      <BackToListLink />
      <h2 className="display-2 text-center">
        Chapter {chapter.heading.number}
      </h2>
      <Card border="secondary" className="p-5 parchment my-4">
        <div className="biblical-text">
          <Markdown remarkPlugins={[remarkGfm]}>
            {chapter.contentMarkdown}
          </Markdown>
        </div>
      </Card>

      <div
        className={classNames("text-center", "d-grid", {
          "d-none": answerIsShown,
        })}
      >
        <Button size="lg" onClick={showAnswer}>
          What {chapter.heading.type} is Isaiah talking about?
        </Button>
      </div>
      <div className={classNames({ "d-none": !answerIsShown })}>
        <div id="answer" className="text-center mb-4">
          <h1 className="display-1">{chapter.heading.title}</h1>
          <Image
            src={`/data/chapter-images/${chapter.heading.numberID}.jpg`}
            fluid
            className="rounded-start"
          />
        </div>
        <BackToListLink />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ChapterDetails;
