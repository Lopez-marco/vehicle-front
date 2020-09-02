import React from "react";

const VehicleEdit = (props) => {
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
  return <div></div>;
};

export default VehicleEdit;
