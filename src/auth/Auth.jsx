import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

const Auth = (props) => {
  const [sessionToken, setSessionToken] = useState("");
  const [updateActive, setUpdateActive] = useState(false);

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

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const updateOn = () => {
    setUpdateActive(true);
  };
  const updateOff = () => {
    setUpdateActive(false);
  };

  const [isLogin, setIsLogin] = useState(true);

  const title = isLogin ? "Login" : "Signup";
  const log = isLogin ? (
    <Login
      updateToken={props.updateToken}
      togglepopup={toggle}
      updateOn={updateOn}
    />
  ) : (
    <Signup updateToken={props.updateToken} togglepopup={toggle} />
  );

  function Toggle(e) {
    e.preventDefault();
    if (isLogin == true) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }

  return (
    <div>
      <Button className="buttonsign" onClick={toggle}>
        {buttonLabel}Sign In/Sign Up
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          <h1>{title} </h1>
        </ModalHeader>
        <ModalBody>{log}</ModalBody>
        <ModalFooter>
          <Button onClick={(e) => Toggle(e)} color="primary">
            Toggle Signup/Login
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Auth;
