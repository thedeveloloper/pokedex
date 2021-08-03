import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";

function App() {
  return (
    <div className="background">
      <Router>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
