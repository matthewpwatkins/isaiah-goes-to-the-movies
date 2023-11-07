import { Col, Ratio, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import ChapterHeading from "../models/ChapterHeading";
import { TextDividerLine } from "./TextDividerLine";

export interface ChapterListProps {
  chapterHeadings: ChapterHeading[];
  className?: string;
}

function ChapterList(props: ChapterListProps) {
  return (
    <Row className={props.className}>
      {props.chapterHeadings.map((chapterHeading) => (
        <Col key={chapterHeading.numberID} xs="4" md="3" lg="2" className="p-3">
          <TextDividerLine>Ch. {chapterHeading.number}</TextDividerLine>
          <Link
            to={`/chapters/${chapterHeading.numberID}`}
            title={`Chapter ${chapterHeading.number}`}
          >
            <Ratio
              aspectRatio={(40 / 27) * 100}
              className="rounded border border-secondary-subtle bg-secondary"
            >
              <Image
                src={
                  chapterHeading.visited
                    ? `/data/chapter-images/${chapterHeading.numberID}.jpg`
                    : "/question-mark.png"
                }
                style={{ opacity: 0.5 + (chapterHeading.visited ? 0.5 : 0.25) }}
                alt={`Chapter ${chapterHeading.number}`}
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

export default ChapterList;
