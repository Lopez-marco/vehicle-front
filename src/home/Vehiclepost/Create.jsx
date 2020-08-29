import React, { useState, useEffect, useHistory } from "react";
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

  // const [fileInputState, setFileInputState] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
  // const [previewSource, setPreviewSource] = useState("");
  // const handlefileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  // };
  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  // const handleSubmitFile = (e) => {
  //   e.preventDefault();
  //   if (!previewSource) return;
  //   uploadImage(previewSource);
  // };
  // const uploadImage = async (base64EncodeImage) => {
  //   console.log(base64EncodeImage);
  //   try {
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ data: base64EncodeImage }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //////////////////////////////////////////////////

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dev_setup");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mlpez/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    console.log(res);
    setImage(file.secure_url);
    setLoading(false);
  };
  //////////////////////////////////////////////////

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
          photo: image,
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
        refreshPage();
      });
  };

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
  function refreshPage() {
    window.location.href = "/";
  }

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
                disabled
                name="photo"
                value={image}
                // placeholder={image}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
              />
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <img src={image} style={{ width: "300px" }} />
              )}
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
            <Button type="submit">Click to Submit</Button>
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
