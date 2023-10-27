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
            <Ratio aspectRatio={(40 / 27) * 100} className="rounded border border-secondary-subtle">
              {entry.visited ? (
                <Image
                  src={entry.img}
                  fluid
                  className="object-fit-fill"
                />
              ) : (
                <div className="bg-secondary"></div>
              )}
            </Ratio>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default EntryList;
