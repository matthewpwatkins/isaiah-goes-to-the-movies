import { Card, Col, Row } from "react-bootstrap";
import Entry from "../models/Entry";

export interface MovieListProps {
  entries: Entry[];
}

function EntryList(props: MovieListProps) {
  return (
    <Row>
      {props.entries.map(entry => (
        <Col key={entry.id} xs="4" md="2">
          <Card border="secondary" className="p-3 my-3" style={{ opacity: entry.visited ? 1 : 0.5 }}>
          <p>{entry.id}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default EntryList;