import React from "react";

import { Button } from "reactstrap";

const LogoutButton = (props) => {
  function refreshPage() {
    window.location.reload(true);
  }

  return (
    <div>
      <Button
        className="buttonsign"
        onClick={() => {
          props.clickLogout();
          refreshPage();
        }}
      >
        Log out
      </Button>
    </div>
  );
};

export default LogoutButton;
