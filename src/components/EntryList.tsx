import { Col, Ratio, Row } from "react-bootstrap";
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
        <Col key={entry.id} xs="4" md="3" lg="2" className="p-3">
          <Link to={`/entries/${entry.id}`}>
            <Ratio aspectRatio={(40 / 27) * 100} className="rounded border border-secondary-subtle bg-secondary">
              <Image
                src={entry.visited ? entry.img : "/question-mark.png"}
                style={{ opacity: (.5 + (entry.visited ? .5 : .25)) }}
                fluid
                className="object-fit-fill"
              />
            </Ratio>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default EntryList;
