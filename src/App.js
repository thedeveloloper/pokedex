import React from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import Dashboard from "./components/layout/Dashboard";
import PokemonList from "./components/pokemon/PokemonList";

function App() {
  return (
    <div className="background">
      <Router>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/list" component={PokemonList} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
