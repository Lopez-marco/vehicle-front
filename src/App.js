import React, { useEffect, useState } from 'react';
import NavbarVeh from "./home/NavbarVeh";
import Logo from "./home/Logo"
import Navigation from "./home/Navigation"
import Vehiclesmain from './home/Vehiclemain/Vehiclesmain';
import ParentVehicle from './home/Vehiclemain/ParentVehicle';
import { Row, Container, Col, FormGroup, Label, Input, FormText, Form, Button } from "reactstrap"
import { BrowserRouter as Router, } from 'react-router-dom';
import Footer from "./home/Footer"

function App(props) {
  const [updateActive, setUpdateActive] = useState(false);
  const [sessionToken, setSessionToken] = useState('');


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const updateOn = (props) => {
    setUpdateActive(true);
  }
  const updateOff = () => {
    setUpdateActive(false);
  }


  return (
    <div className="App">
      <NavbarVeh updateToken={updateToken} clickLogout={clearToken} updateOn={updateOn} />
      <Logo />
      <Container>
        <Router>
          <Navigation updateToken={updateToken} updateOn={updateOn} />
        </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
