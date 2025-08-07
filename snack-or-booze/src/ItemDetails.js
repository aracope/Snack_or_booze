import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**
 * Generic component for displaying details of a single item.
 * 
 * Props:
 * - items: array of snacks or drinks
 * - cantFind: redirect path if item is not found
 * 
 * Uses useParams() to grab item ID from URL.
 * If item not found, redirects to fallback.
 */

function ItemDetails({ items, cantFind }) {
  const { id } = useParams();

  const item = items.find(item => item.id === id);
  if (!item) return <Redirect to={cantFind} />;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default ItemDetails;
