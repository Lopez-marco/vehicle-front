import React, {useState, useEffect} from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Col,
  CardHeader,
} from "reactstrap";
import APIURL from "../../helpers/environment";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  ///////////////////////////upload image//////////////
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
  ///////////////////////////////edit//////////////////////
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
          description: value,
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

  function refreshPage() {
    window.location.href = "/";
  }

  const [value, setValue] = useState("");
  /////////////////////handle for editor/////////////
  const handleOnChange = (e, editor) => {
    const data = editor.getData();
    setValue(data);
  };

  return (
    <>
      <Card>
        <CardHeader style={{backgroundColor: "#4CB0BD"}}>
          <h5>Add A Vehicle</h5>
        </CardHeader>
        <br />
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <b>Year</b>
              <Label htmlFor="year" />
              <Input
                type="select"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">-</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
              </Input>
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
                <img src={image} style={{width: "300px"}} />
              )}
            </FormGroup>
            <FormGroup>
              <b>Description</b>
              <CKEditor
                editor={ClassicEditor}
                value={description}
                onChange={handleOnChange}
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