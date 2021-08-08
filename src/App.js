import React from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Dashboard from "./components/layout/Dashboard";
import PokemonList from "./components/pokemon/PokemonList";

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
          <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon" component={PokemonList} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
