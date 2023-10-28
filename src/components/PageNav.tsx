import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function PageNav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src="/favicon-32x32.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />{" "}
            Isaiah Goes to the Movies
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}

export default PageNav;
