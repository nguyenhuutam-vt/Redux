import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppSelector } from "../redux/hook";

const Header = () => {
  // de thang redux bk lay toi tk nao trong nhiu tk redux thi dua vao state.user de no tro toi redux nao
  const users = useAppSelector((state) => state.user.listUser);
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">user: {users.length}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
