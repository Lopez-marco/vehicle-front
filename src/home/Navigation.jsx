import React, { useState, useEffect } from "react";
import Create from "./Vehiclepost/Create";
import { Route, Link, Switch } from "react-router-dom";
import ParentVehicle from "./Vehiclemain/ParentVehicle";
import MyVehicle from "./Vehiclemain/MyVehicle";
import UserwithToken from "./UserwithToken";
import AboutUs from "./AboutUs";

import {
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
} from "reactstrap";
import ContactUs from "./ContactUs";

const Navigation = (props) => {
  const [sessionToken, setSessionToken] = useState("");
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

  const usernavigation = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <UserwithToken token={props.token} />
    ) : (
      ""
    );
  };

  useState(() => {
    usernavigation();
  }, []);

  return (
    <div>
      <Row xs="4">
        <Col>
          <ListGroup>
            <ListGroupItem
              active
              tag="a"
              action
              style={{ backgroundColor: "#4CB0BD" }}
              href="/"
            >
              The CV
            </ListGroupItem>
            <ListGroupItem tag="a" action>
              <Link to="/inventory" style={{ textDecoration: "none" }}>
                Invetory
              </Link>
            </ListGroupItem>
            {usernavigation()}
          </ListGroup>
        </Col>
        <Col xs="9">
          <Switch>
            <Route exact path="/inventory">
              <ParentVehicle />
            </Route>
            <Route exact path="/myvehicle">
              <MyVehicle token={props.token} />
            </Route>
            <Route exact path="/Create">
              <Create updatetoken={props.updateToken} />
            </Route>
            <Route exact path="/">
              <ParentVehicle token={props.token} />
            </Route>
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/contact-us">
              <ContactUs />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default Navigation;
