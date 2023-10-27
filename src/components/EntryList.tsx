import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Entry from "../models/Entry";
import { Link } from "react-router-dom";

export interface MovieListProps {
  entries: Entry[];
}

function EntryList(props: MovieListProps) {
  return (
    <Row>
      {props.entries.map((entry) => (
        <Col key={entry.id} xs="6" sm="4" md="3" className="p-3">
          <Link to={`/entries/${entry.id}`}>
            <Image src={entry.img} rounded fluid  />
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default EntryList;
