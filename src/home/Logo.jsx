import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Logo = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Car-O-Clock</h1>
          <h5 className="lead">
            A Website to Buy and Sell your Used Vehicle with Cash.
          </h5>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Logo;
