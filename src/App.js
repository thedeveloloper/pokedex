import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";

import Background from "./res/pokeballs.jpg";

function App() {
  return (
    <Router>
      <div style={{ background: `url(${Background})` }}>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
