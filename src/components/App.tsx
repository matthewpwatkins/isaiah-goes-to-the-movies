import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Entry from "../models/Entry";
import { entryIsVisited } from "../util/StorageManager";
import "./App.css";
import EntryList from "./EntryList";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  async function loadEntries() {
    const res = await fetch("/api/list-entries");
    const entries = await (res.json() as Promise<Entry[]>);
    for (const entry of entries) {
      entry.visited = entryIsVisited(entry.id!);
    }
    setEntries(entries);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      <Card className="d-flex flex-row flex-wrap">
        <Row>
          <Col sm="12" md="6" lg="4">
            <Image
              src="/isaiah-goes-to-the-movies.jpg"
              fluid
            />
          </Col>
          <Col className="px-3">
            {/* <h1 className="display-3">Isaiah Goes to the Movies</h1> */}
            <p className="lead">
              Isaiah is difficult to understand sometimes. Okay,{" "}
              <em>all the time</em>. He uses heavy symbolism, jumps back and
              forward in time, and ties everything he sees in vision into an
              ancient Near Eastern context.
            </p>
            <p className="lead">
              So, let's practice interpreting Isaiah! Each chapter below shows
              how Isaiah might describe a famous movie plot or movie moment.
              Click on each one and see if you can guess which movie Isaiah is
              watching!
            </p>
            <p className="lead">
              <small className="text-secondary">
                PS: This is meant for fun and satire, not to make fun of Isaiah,
                the Bible, or any of the prophets.
              </small>
            </p>
          </Col>
        </Row>
      </Card>
      <EntryList entries={entries} />
    </>
  );
}

export default App;
