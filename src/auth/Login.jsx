import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import Navigation from "../home/Navigation";
import APIURL from "../helpers/environment";

const Login = (props) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updateActive, setUpdateActive] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/signin`, {
      method: "POST",
      body: JSON.stringify({
        user: { Email: Email, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
        props.togglepopup();
        refreshPage();
      });
  };

  function refreshPage() {
    window.location.reload(true);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="Email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="Email"
            value={Email}
            type="email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            value={password}
            minlength="5"
            required
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
