import React, { useEffect, useState } from "react";
import Myvehiclechild from "./MyVehiclechild";

const MyVehicle = (props) => {
  const [vehicle, setVehicle] = useState([]);
  const [results, setResults] = useState([]);

  const mineVehicle = () => {
    fetch("http://localhost:3000/vehicle/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
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

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  // var arr = Object.keys(vehicle);

  // var arrObj = arr.map(function (key) {
  //   return { [key]: vehicle[key] };
  // });

  // console.log(arrObj);
  // console.log(results);
  // console.log(vehicle);
  // useEffect(() => {
  //   mineVehicle();
  // }, []);

  return (
    <div>
      <h1>Test my vehicle</h1>
      <button onClick={displayMne()}>click</button>
    </div>
  );
};

export default MyVehicle;
