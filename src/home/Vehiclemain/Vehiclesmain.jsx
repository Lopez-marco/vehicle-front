import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Badge,
} from "reactstrap";
import Auth from "../../auth/Auth";
import Vehiclemodel from "./Vehiclemodel";

const Vehiclesmain = (props) => {
  const { year, make, model, price, photo, color, millage } = props.vehicle;

  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);
  ////////////////broken or no image///////////////
  function addDefaultSrc(ev) {
    ev.target.src =
      "https://media3.giphy.com/media/3oFzm3j6QQ4ZVGsdAQ/giphy.gif";
  }
  /////////////////////////Button user switch/////////////////////////
  const protectedButton = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Vehiclemodel vehicle={props.vehicle} />
    ) : (
      <Auth updateToken={props.updateToken} />
    );
  };
  /////////////////////Badege for not loging user///////
  const badge = () => {
    return sessionToken === localStorage.getItem("token") ? (
      ""
    ) : (
      <Badge color="warning" pill>
        Sign In or Sign Up to see Full Description
      </Badge>
    );
  };
  /////////////////////////End Button user Switch///////////////////
  return (
    <div>
      <Container className="themed-container" fluid="lg">
        <Col lg="12">
          <Card>
            <Row className="rowcard">
              <Col sm="4">
                <CardImg
                  top
                  width="100%"
                  src={photo}
                  alt="Card image cap"
                  onError={addDefaultSrc}
                />
              </Col>
              <Col md="8">
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle>
                        <b>Year: </b>
                        {year} <br /> <b>Make: </b> {make} <br />
                        <b>Model: </b> {model}
                      </CardTitle>
                    </Col>
                    <Col>
                      <CardText>
                        <b>Color:</b> {color} <br />
                        <b>Price: </b>
                        {price}
                        <br />
                        <b>Millage: </b>
                        {millage}
                      </CardText>
                    </Col>
                  </Row>
                  {protectedButton()}
                  {badge()}
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Container>
      <br />
    </div>
  );
};

export default Vehiclesmain;
