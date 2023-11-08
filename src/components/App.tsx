import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ChapterHeading from "../models/ChapterHeading";
import { chapterIsVisited } from "../util/StorageManager";
import "./App.css";
import ChapterList from "./ChapterList";
import { initPage } from "./PageComponent";

function App() {
  const [chapterHeadings, setChapterHeadings] = useState<ChapterHeading[]>([]);

  async function loadEntries() {
    initPage({});
    const res = await fetch("/data/chapters/_list");
    const chapterHeadings = await (res.json() as Promise<ChapterHeading[]>);
    chapterHeadings.reverse();
    for (const chapterHeading of chapterHeadings) {
      chapterHeading.visited = chapterIsVisited(chapterHeading.numberID);
    }
    setChapterHeadings(chapterHeadings);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      <Row className="mb-0 mb-md-3">
        <Col sm="12" md="6" lg="4">
          <Image
            src="/isaiah-goes-to-the-movies.jpg"
            fluid
            alt="Isaiah Goes to the Movies"
            className="mb-3 mb-md-0"
            loading="lazy"
          />
        </Col>
        <Col className="px-3">
          <p className="lead">
            Isaiah is difficult to understand sometimes. Okay,{" "}
            <em>all the time</em>. He uses heavy symbolism, jumps back and forth
            in time, and ties everything he sees in vision into an ancient Near
            Eastern context.
          </p>
          <p className="lead">
            So, let's practice interpreting Isaiah! Each chapter below shows how
            Isaiah might describe a famous movie plot or movie moment. Click on
            each one and see if you can guess which movie Isaiah is watching!
          </p>
          <p className="lead">
            <small className="text-secondary">
              PS: This is meant for fun and satire, not to make fun of Isaiah,
              the Bible, or any of the prophets.
            </small>
          </p>
        </Col>
      </Row>
      <h2 className="display-2 text-center">Chapters</h2>
      <ChapterList
        chapterHeadings={chapterHeadings}
        className={classNames({ "d-none": !chapterHeadings?.length })}
      />
    </>
  );
}

export default App;
