import { Container, Navbar } from "react-bootstrap";

function PageNav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://react-bootstrap.github.io/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Isaiah Goes to the Movies
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default PageNav;
