import React from "react";
import { Jumbotron, Container } from "reactstrap";
import styled from "styled-components";

const Logo = (props) => {
  const Style = styled.img`
  z-index: 1
  width: 100%
  margin: auto`;

  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">The Cash Vehicle</h1>
          <h5 className="lead">
            A Website to Buy and Sell your Used Vehicle with Cash.
          </h5>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Logo;
