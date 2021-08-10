import React from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./components/layout/Home";
import PokemonList from "./components/pokemon/PokemonList";
import NavBar from "./components/layout/NavBar";

import { Divider } from "semantic-ui-react";

function App() {
  return (
    <div className="background">
      <div align="center">
        <div
          style={{
            align: "center",
            width: "65%",
            height: "100%",
            minHeight: "100vh",
            backgroundColor: "#DDD",
            padding: "10px",
          }}
        >
          <NavBar />
          <Divider />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokemon" component={PokemonList} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
