import React, { useEffect, useState } from "react";
import Vehiclemain from "./Vehiclesmain";

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

  function displayMne() {
    return vehicle.entries((result, index) => (
      <Vehiclemain token={sessionToken} key={index} vehicle={result} />
    ));
  }

  // useEffect(() => {
  //   mineVehicle();
  // }, []);

  return (
    <div>
      <h1>Test my vehicle</h1>
      <button onClick={displayMne()}>click</button>
      {/*  */}
    </div>
  );
};

export default MyVehicle;
