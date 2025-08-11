/**
 * Form to add a new snack or drink item to the menu.
 *
 * Props:
 * - setSnacks: function to update snack list in parent state
 * - setDrinks: function to update drink list in parent state
 *
 * State:
 * - formData: object with keys: type, name, description, recipe, serve
 *
 * Behavior:
 * - Submits form data to the API
 * - Updates appropriate list in parent (snacks or drinks)
 * - Redirects to the corresponding page after submission
 */

import React, { useState } from "react";
import SnackOrBoozeApi from "./Api";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

/** Form to add a snack or drink */
function AddItemForm({ setSnacks, setDrinks }) {
  const INITIAL_STATE = {
    // Determines which endpoint to use
    type: "snacks",
    name: "",
    description: "",
    recipe: "",
    serve: "",
  };

  // Used for navigation after submit
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();

  /** Handle form submit:
   * - Post new item to API
   * - Update parent state
   * - Redirect user
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const newItem = await SnackOrBoozeApi.addItem(formData.type, formData);
    if (formData.type === "snacks") {
      setSnacks((snacks) => [...snacks, newItem]);
      history.push("/snacks");
    } else {
      setDrinks((drinks) => [...drinks, newItem]);
      history.push("/drinks");
    }
  }

  /** Handle changes to any form input field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input
          id="type"
          type="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="snacks">Snack</option>
          <option value="drinks">Drink</option>
        </Input>
      </FormGroup>

      {/* Reusable input fields for all other form data */}
      {["name", "description", "recipe", "serve"].map((field) => (
        <FormGroup key={field}>
          <Label for={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Input
            id={field}
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
