import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import PageNav from "./PageNav";

function Layout() {
  return (<>
    <PageNav />
    <Container className="p-3 mt-3">
      <Outlet />
    </Container>
  </>);
}

export default Layout;