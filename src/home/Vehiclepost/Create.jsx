import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Row,
  Col,
  CardHeader,
} from "reactstrap";
import APIURL from "../../helpers/environment";

const Create = (props) => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [millage, setMillage] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.updateToken);
    fetch(`${APIURL}/vehicle/addveh`, {
      method: "POST",
      body: JSON.stringify({
        vehicle: {
          year: year,
          make: make,
          model: model,
          vin: vin,
          price: price,
          millage: millage,
          color: color,
          photo: photo,
          description: description,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        setYear("");
        setMake("");
        setModel("");
        setVin("");
        setPrice("");
        setMillage("");
        setColor("");
        setPhoto("");
        setDescription("");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <Card>
        <CardHeader style={{ backgroundColor: "#4CB0BD" }}>
          <h5>Add A Vehicle</h5>
        </CardHeader>
        <br />
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <b>Year</b>
              <Label htmlFor="year" />
              <Input
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Make</b>
              <Label htmlFor="make" />
              <Input
                name="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Model</b>
              <Label htmlFor="model" />
              <Input
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Vin</b>
              <Label htmlFor="vin" />
              <Input
                name="vin"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Millage</b>
              <Label htmlFor="millage" />
              <Input
                name="millage"
                value={millage}
                onChange={(e) => setMillage(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Color</b>
              <Label htmlFor="color" />
              <Input
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Price</b>
              <Label htmlFor="price" />
              <Input
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <b>Photo </b>
              <Label htmlFor="photo" />
              <Input
                name="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              "(Image Has to be upload to a external server. Link need to be
              Provided)"
            </FormGroup>
            <FormGroup>
              <b>Description</b>
              <Label htmlFor="description" />
              <Input
                type="textarea"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              onClick={(event) => (window.location.href = "/")}
            >
              Click to Submit
            </Button>
          </Form>
        </Col>
        <br />
      </Card>
      <br />
      <br />
    </>
  );
};

export default Create;
