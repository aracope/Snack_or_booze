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
