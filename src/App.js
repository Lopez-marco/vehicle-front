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

  ///////////////////////file///////////////
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  //////////////////////file///////////

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
      <Form>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
        </FormText>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default App;
