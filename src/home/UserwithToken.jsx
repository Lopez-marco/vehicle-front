import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";

const UserwithToken = (props) => {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <ListGroupItem tag="a" href="/myvehicles" action>
        <Link to="/myvehicle" style={{ textDecoration: "none" }}>
          My Vehicle's
        </Link>
      </ListGroupItem>
      <ListGroupItem tag="a" href="/create" action>
        <Link to="/create" style={{ textDecoration: "none" }}>
          Add a Vehicle
        </Link>
      </ListGroupItem>
    </>
  );
};

export default UserwithToken;
