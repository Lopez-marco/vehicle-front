import React, { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import Auth from "../auth/Auth";
import LogoutButton from "./LogoutButton";
import Clock from "../Assets/speedo.png";

const NavbarVeh = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  console.log(sessionToken);

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedButton = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <LogoutButton clickLogout={clearToken} />
    ) : (
      <Auth updateToken={props.updateToken} />
    );
  };

  return (
    <Navbar className="navco" light expand="md">
      <NavbarBrand className="logoname" href="/">
        Car-<img src={Clock} style={{ width: "2em" }} alt="clock"></img>-Clock
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
