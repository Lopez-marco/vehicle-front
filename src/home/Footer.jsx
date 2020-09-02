import React from "react";
import { Card, CardFooter } from "reactstrap";

const Footer = () => {
  return (
    <Card>
      <CardFooter className="text-muted" style={{ textAlign: "center" }}>
        Created by Marco Lopez
      </CardFooter>
    </Card>
  );
};

export default Footer;
