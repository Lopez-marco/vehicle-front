import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import APIURL from "../../helpers/environment";
import ReactHtmlParser from "react-html-parser";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Auth from "../../auth/Auth";

const Vehiclesmain = (props) => {
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

  const [setVehicleshow] = useState([]);
  //////////////Vehicule ID/////

  const fetchVehiclemain = () => {
    fetch(`${APIURL}/vehicle/get/${props.vehicle.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setVehicleshow(results);
        console.log(results);
        console.log();
      });
  };

  ////////Edit Vehicle//////
  const [editYear, setEditYear] = useState(props.vehicle.year);
  const [editMake, setEditMake] = useState(props.vehicle.make);
  const [editModel, setEditModel] = useState(props.vehicle.model);
  const [editVin, setEditVin] = useState(props.vehicle.vin);
  const [editPrice, setEditPrice] = useState(props.vehicle.price);
  const [editPhoto, setEditPhoto] = useState(props.vehicle.photo);
  const [editDescription, setEditDescription] = useState(
    props.vehicle.description
  );

  const vehicleEdit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/vehicle/editveh/${props.vehicle.id}`, {
      method: "PUT",
      body: JSON.stringify({
        vehicle: {
          year: editYear,
          make: editMake,
          model: editModel,
          vin: editVin,
          price: editPrice,
          photo: editPhoto,
          description: editDescription,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    }).then((res) => {
      refreshPage();
    });
  };

  function refreshPage() {
    window.location.reload(true);
  }

  //////////////////////////Edit End/////////////////
  /////////////////////////////image//////////////////
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
    setEditPhoto(file.secure_url);
    setLoading(false);
  };

  ///////////////////////////image end//////////////////
  //////////////////////Editor////////////
  const handleOnChange = (e, editor) => {
    const data = editor.getData();
    //setValue(data);
    setEditDescription(data);
  };
  ////////////////////editor end//////////////
  /////////////////////Delete/////////////////////

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

  //////////////////////MODAL///////////////////////////////////////////

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const [modal2, setModal2] = useState(false);

  const toggle2 = () => setModal2(!modal2);

  function addDefaultSrc(ev) {
    ev.target.src =
      "https://media3.giphy.com/media/3oFzm3j6QQ4ZVGsdAQ/giphy.gif";
  }

  //////////////////////EndModal////////////////////////////////////////

  /////////////////////////Button user switch/////////////////////////

  const protectedButton = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Button onClick={toggle} color="primary">
        {buttonLabel}See Full Description
      </Button>
    ) : (
      <Auth updateToken={props.updateToken} />
    );
  };

  const badge = () => {
    return sessionToken === localStorage.getItem("token") ? (
      ""
    ) : (
      <Badge color="warning" pill>
        Sign In or Sign Up to see Full Description
      </Badge>
    );
  };

  /////////////////////////End Button user Switch///////////////////

  return (
    <div>
      <Container className="themed-container" fluid="lg">
        <Col lg="12">
          <Card>
            <Row className="rowcard">
              <Col sm="4">
                <CardImg
                  top
                  width="100%"
                  src={photo}
                  alt="Card image cap"
                  onError={addDefaultSrc}
                />
              </Col>
              <Col md="8">
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle>
                        <b>Year: </b>
                        {year} <br /> <b>Make: </b> {make} <br />
                        <b>Model: </b> {model}
                      </CardTitle>
                    </Col>
                    <Col>
                      <CardText>
                        <b>Color:</b> {color} <br />
                        <b>Price: </b>
                        {price}
                        <br />
                        <b>Millage: </b>
                        {millage}
                      </CardText>
                    </Col>
                  </Row>
                  {protectedButton()}
                  {badge()}

                  {/* ///////////////////////Modal/////////////////////// */}
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
                      <Modal
                        isOpen={modal2}
                        toggle={toggle2}
                        className={className}
                      >
                        <ModalHeader toggle={toggle2}>Modal title</ModalHeader>
                        <ModalBody>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={toggle2}>
                            Do Something
                          </Button>{" "}
                          <Button color="secondary" onClick={toggle2}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                      <Button color="warning" onClick={toggleNested}>
                        Edit
                      </Button>
                      <Modal
                        isOpen={nestedModal}
                        toggle={toggleNested}
                        onClosed={closeAll ? toggle : undefined}
                      >
                        <ModalHeader>Edit Vehicle Informacion</ModalHeader>

                        {/* ////////////Edit///////// */}
                        <ModalBody>
                          <Card>
                            <Col>
                              <h3>Add A Vehicle</h3>
                              <Form onSubmit={vehicleEdit}>
                                <FormGroup>
                                  Year
                                  <Label htmlFor="year" />
                                  <Input
                                    name="year"
                                    value={editYear}
                                    onChange={(e) =>
                                      setEditYear(e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  Make
                                  <Label htmlFor="make" />
                                  <Input
                                    name="make"
                                    value={editMake}
                                    onChange={(e) =>
                                      setEditMake(e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  Model
                                  <Label htmlFor="model" />
                                  <Input
                                    name="model"
                                    value={editModel}
                                    onChange={(e) =>
                                      setEditModel(e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  Vin
                                  <Label htmlFor="vin" />
                                  <Input
                                    name="vin"
                                    value={editVin}
                                    onChange={(e) => setEditVin(e.target.value)}
                                  />
                                </FormGroup>
                                <FormGroup>
                                  Price
                                  <Label htmlFor="price" />
                                  <Input
                                    name="price"
                                    value={editPrice}
                                    onChange={(e) =>
                                      setEditPrice(e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  Photo
                                  <Label htmlFor="photo" />
                                  <Input
                                    name="photo"
                                    value={editPhoto}
                                    onChange={(e) =>
                                      setEditPhoto(e.file.secure_url)
                                    }
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
                                    <img
                                      src={image}
                                      style={{ width: "300px" }}
                                    />
                                  )}
                                </FormGroup>
                                <FormGroup>
                                  Description
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={description}
                                    onChange={handleOnChange}
                                  />
                                  {/* <Label htmlFor="description" />
                                  <Input
                                    name="description"
                                    value={editDescription}
                                    onChange={(e) =>
                                      setEditDescription(e.target.value)
                                    }
                                  /> */}
                                </FormGroup>
                                <Button type="submit">Click to Submit</Button>
                              </Form>
                              <br />
                            </Col>
                          </Card>
                        </ModalBody>
                        {/* ////////////Edit End////////// */}
                        <ModalFooter>
                          <Button color="primary" onClick={toggleNested}>
                            Done
                          </Button>
                          <Button color="secondary" onClick={toggleAll}>
                            All Done
                          </Button>
                        </ModalFooter>
                      </Modal>
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

                  {/* //////////////////////////end Modal///////////////////////// */}
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Container>
      <br />
    </div>
  );
};

export default Vehiclesmain;
