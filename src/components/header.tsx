import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { changMode } from "../redux/app/appSlice";

const Header = () => {
  // de thang redux bk lay toi tk nao trong nhiu tk redux thi dua vao state.user de no tro toi redux nao
  const users = useAppSelector((state) => state.user.listUser);
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //doi dark mode
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);
  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">user: {users.length}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light Mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark Mode</Navbar.Text>
              )
            }
            defaultChecked={mode === "dark" ? true : false}
            onChange={(e) =>
              dispatch(changMode(e.target.checked ? "dark" : "light"))
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
