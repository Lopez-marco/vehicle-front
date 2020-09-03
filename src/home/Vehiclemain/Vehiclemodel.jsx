import React, { useEffect, useState } from "react";
import {
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import APIURL from "../../helpers/environment";
import ReactHtmlParser from "react-html-parser";
import VehicleModalEdit from "./VehicleModalEdit";

const Vehiclemodel = (props) => {
  const {
    year,
    make,
    model,
    description,
    price,
    photo,
    color,
    millage,
    vin,
  } = props.vehicle;

  function refreshPage() {
    window.location.reload(true);
  }

  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const Delete = () => {
    fetch(`${APIURL}/vehicle/delveh/${props.vehicle.id}`, {
      method: "Delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    }).then(() => {
      refreshPage();
    });
  };

  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function addDefaultSrc(ev) {
    ev.target.src =
      "https://media3.giphy.com/media/3oFzm3j6QQ4ZVGsdAQ/giphy.gif";
  }

  return (
    <>
      <Button color="danger" onClick={toggle} color="primary">
        {buttonLabel}See Full Description
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {year} {make} {model}
        </ModalHeader>
        <CardImg
          top
          width="100%"
          src={photo}
          alt="Card image cap"
          onError={addDefaultSrc}
        />
        <ModalBody>
          <b>Year: </b>
          {year} <br /> <b>Make: </b> {make} <br />
          <b>Model: </b> {model} <br />
          <b>Color:</b> {color} <br />
          <b>Price: </b>
          {price}
          <br />
          <b>Millage: </b>
          {millage} <br />
          <b>Vin: </b> {vin} <br />
          <b>Description: </b>
          {ReactHtmlParser(description)}
          <br />
        </ModalBody>

        <ModalFooter>
          <VehicleModalEdit vehicle={props.vehicle} />
          <Button
            color="danger"
            onClick={() => {
              Delete();
            }}
          >
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Vehiclemodel;
