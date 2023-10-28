import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function BackToListLink() {
  return (
    <LinkContainer to="/">
      <Button variant="outline-primary">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to list
      </Button>
    </LinkContainer>
  );
}
