import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

/**
 * Home page component.
 *
 * Props:
 * - snacks: array of snack objects
 * - drinks: array of drink objects
 *
 * Renders a welcome message and summary of available items.
 */

function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
            <p>
              We have {snacks.length} snacks and {drinks.length} drinks to
              enjoy.
            </p>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
