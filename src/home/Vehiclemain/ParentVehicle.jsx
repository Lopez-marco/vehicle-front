import React, { useState, useEffect } from "react";
import Vehiclemain from "./Vehiclesmain";
import { Card, CardHeader } from "reactstrap";
import APIURL from "../../helpers/environment";

const ParentVehicle = (props) => {
  const [vehicle, setVehicle] = useState([]);
  const [results, setResults] = useState([]);

  const fetchVehicle = () => {
    fetch(`${APIURL}/vehicle/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setVehicle(results);
        console.log(results);
      });
  };

  function displayCards() {
    return vehicle.map((result, index) => (
      <Vehiclemain token={props.token} key={index} vehicle={result} />
    ));
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader style={{ backgroundColor: "#4CB0BD" }}>
          <h5 style={{ textAlign: "center" }}>Inventory</h5>
        </CardHeader>
        <br />
        {displayCards()}
      </Card>
    </div>
  );
};

export default ParentVehicle;
