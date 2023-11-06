import { Col, Ratio, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Entry from "../models/Entry";
import { Link } from "react-router-dom";
import { TextDividerLine } from "./TextDividerLine";

export interface MovieListProps {
  entries: Entry[];
  className?: string;
}

function EntryList(props: MovieListProps) {
  return (
    <Row className={props.className}>
      {props.entries.map((entry) => (
        <Col key={entry.id} xs="4" md="3" lg="2" className="p-3">
          <TextDividerLine>#{parseInt(entry.id!)}</TextDividerLine>
          <Link to={`/entries/${entry.id}`}>
            <Ratio
              aspectRatio={(40 / 27) * 100}
              className="rounded border border-secondary-subtle bg-secondary"
            >
              <Image
                src={entry.visited ? entry.img : "/question-mark.png"}
                style={{ opacity: 0.5 + (entry.visited ? 0.5 : 0.25) }}
                fluid
                rounded
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
