import React, { useEffect, useState } from "react";
import Myvehiclechild from "./MyVehiclechild";
import { Card, CardHeader } from "reactstrap";

const MyVehicle = (props) => {
  const [vehicle, setVehicle] = useState([]);
  const [results, setResults] = useState([]);

  const mineVehicle = () => {
    fetch("http://localhost:3000/vehicle/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        new setVehicle(results);
        console.log(results);
      });
  };

  function displayMne() {
    return vehicle.map((result, index) => (
      <Myvehiclechild token={sessionToken} key={index} vehicle={result} />
    ));
  }

  const [sessionToken, setSessionToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  // const updateToken = (newToken) => {
  //   localStorage.setItem("token", newToken);
  //   setSessionToken(newToken);
  //   console.log(sessionToken);
  // };

  // var arr = Object.keys(vehicle);

  // var arrObj = arr.map(function (key) {
  //   return { [key]: vehicle[key] };
  // });

  // console.log(arrObj);
  // console.log(results);
  // console.log(vehicle);
  useEffect(() => {
    mineVehicle();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader style={{ backgroundColor: "#4CB0BD" }}>
          <h5 style={{ textAlign: "center" }}>My Added Vehicle's</h5>
        </CardHeader>
        <br />
        {displayMne()}
      </Card>
    </div>
  );
};

export default MyVehicle;
