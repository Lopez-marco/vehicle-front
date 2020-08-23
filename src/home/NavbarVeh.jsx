import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import Auth from "../auth/Auth";
import LogoutButton from "./LogoutButton";
import Login from "../auth/Login";

const NavbarVeh = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [updateActive, setUpdateActive] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };
  console.log(sessionToken);

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedButton = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <LogoutButton clickLogout={clearToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <Navbar className="navco" light expand="md">
      <NavbarBrand className="logoname" href="/">
        The CV
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar></Nav>
        {protectedButton()}
      </Collapse>
    </Navbar>
  );
};

export default NavbarVeh;
