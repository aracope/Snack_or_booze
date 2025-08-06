import React, { useState } from "react";
import SnackOrBoozeApi from "./Api";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

/** Form to add a snack or drink */
function AddItemForm({ setSnacks, setDrinks }) {
  const INITIAL_STATE = {
    type: "snacks",
    name: "",
    description: "",
    recipe: "",
    serve: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const newItem = await SnackOrBoozeApi.addItem(formData.type, formData);
    if (formData.type === "snacks") {
      setSnacks(snacks => [...snacks, newItem]);
      history.push("/snacks");
    } else {
      setDrinks(drinks => [...drinks, newItem]);
      history.push("/drinks");
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input type="select" name="type" value={formData.type} onChange={handleChange}>
          <option value="snacks">Snack</option>
          <option value="drinks">Drink</option>
        </Input>
      </FormGroup>
      {["name", "description", "recipe", "serve"].map(field => (
        <FormGroup key={field}>
          <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <Input
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
        </FormGroup>
      ))}
      <Button>Add Item</Button>
    </Form>
  );
}

export default AddItemForm;
