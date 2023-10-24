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
              src="https://react-bootstrap.github.io/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Isaiah Goes to the Movies
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
}

export default PageNav;
