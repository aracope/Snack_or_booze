/src/...:
AddItemForm.js:
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

Api.js:
import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {
  static async getSnacks() {
    const result = await axios.get(`${BASE_API_URL}/snacks`);
    return result.data;
  }
  static async getDrinks() {
    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }

  static async addItem(type, itemData) {
    const result = await axios.post(`${BASE_API_URL}/${type}`, itemData);
    return result.data;
  }
}

export default SnackOrBoozeApi;

App.js:
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import ItemList from "./ItemList";
import ItemDetails from "./ItemDetails";
import AddItemForm from "./AddItemForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const snacks = await SnackOrBoozeApi.getSnacks();
        const drinks = await SnackOrBoozeApi.getDrinks();
        setSnacks(snacks);
        setDrinks(drinks);
        setIsLoading(false);
      } catch (err) {
        console.error("fetch error:", err);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>
            <Route exact path="/snacks">
              <ItemList items={snacks} title="Snacks" baseUrl="snacks" />
            </Route>
            <Route exact path="/drinks">
              <ItemList items={drinks} title="Drinks" baseUrl="drinks" />
            </Route>
            <Route path="/snacks/:id">
              <ItemDetails items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks/:id">
              <ItemDetails items={drinks} cantFind="/drinks" />
            </Route>
            <Route exact path="/add">
              <AddItemForm setSnacks={setSnacks} setDrinks={setDrinks} />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

Home.js:
import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

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
index.js:
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

ItemDetails.js:
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/** Generic item detail component for snack or drink */
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
ItemList.js:
import React from "react";
import { Link } from "react-router-dom";
import "./FoodMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

/** Generic menu list component for snacks/drinks */
function ItemList({ items, title, baseUrl }) {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title} Menu
          </CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <ListGroup>
            {items.map((item) => (
              <Link to={`/${baseUrl}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default ItemList;

NavBar.js:
import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Snack or Booze
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/snacks">Snacks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/drinks">Drinks</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/add">Add</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;

serviceWorker.js:
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit http://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}


/src/__tests__/...:

AddItemForm.test.js:
import { render, screen, fireEvent } from "@testing-library/react";
import AddItemForm from "../AddItemForm";

describe("AddItemForm", () => {
  test("submits form with correct data", () => {
    const mockSetSnacks = jest.fn();
    const mockSetDrinks = jest.fn();

    render(<AddItemForm setSnacks={mockSetSnacks} setDrinks={mockSetDrinks} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Test Item" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Delicious test" },
    });
    fireEvent.change(screen.getByLabelText(/Recipe/i), {
      target: { value: "Cook it well" },
    });
    fireEvent.change(screen.getByLabelText(/Serve/i), {
      target: { value: "With care" },
    });

    fireEvent.click(screen.getByText(/Add Item/i));

    expect(mockAddItem).toHaveBeenCalledWith({
      name: "Test Item",
      description: "Delicious test",
      recipe: "Cook it well",
      serve: "With care",
    });
  });

  test("renders without crashing", () => {
    render(<AddItemForm setSnacks={() => {}} setDrinks={() => {}} />);
  });
});



ItemList.test.js:
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ItemList from "../ItemList";

describe("ItemList", () => {
  const snacks = [
    { id: "oreo", name: "Oreo", description: "Chocolate sandwich cookie" },
    { id: "popcorn", name: "Popcorn", description: "Buttery and salty" }
  ];

  const drinks = [
    { id: "coke", name: "Coke", description: "Sugary soda" },
    { id: "milk", name: "Milk", description: "Dairy goodness" }
  ];

  test("renders snacks list", () => {
    render(
      <MemoryRouter>
        <ItemList items={snacks} type="snacks" />
      </MemoryRouter>
    );
    expect(screen.getByText(/snacks/i)).toBeInTheDocument();
    expect(screen.getByText("Oreo")).toBeInTheDocument();
    expect(screen.getByText("Popcorn")).toBeInTheDocument();
  });

  test("renders drinks list", () => {
    render(
      <MemoryRouter>
        <ItemList items={drinks} type="drinks" />
      </MemoryRouter>
    );
    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
    expect(screen.getByText("Coke")).toBeInTheDocument();
    expect(screen.getByText("Milk")).toBeInTheDocument();
  });
});

SnackOrBoozeApp.test.js:
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("SnackOrBooze App", () => {
  test("renders homepage with snacks and drinks", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to Snack or Booze/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Snacks/i)).toBeInTheDocument();
    expect(screen.getByText(/Drinks/i)).toBeInTheDocument();
  });

  test("navigates to snacks page", async () => {
    render(
      <MemoryRouter initialEntries={["/snacks"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Snacks/i)).toBeInTheDocument();
    expect(await screen.findByText(/Chips/i)).toBeInTheDocument(); // example snack
  });

  test("navigates to drinks page", async () => {
    render(
      <MemoryRouter initialEntries={["/drinks"]}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Drinks/i)).toBeInTheDocument();
    expect(await screen.findByText(/Coke/i)).toBeInTheDocument(); 
  });

  test("shows 404 message for invalid route", () => {
    render(
      <MemoryRouter initialEntries={["/not-found"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Sorry, that page doesn't exist/i)
    ).toBeInTheDocument();
  });
});




