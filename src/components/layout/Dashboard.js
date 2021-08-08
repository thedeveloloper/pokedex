import React from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Grid, Button } from "semantic-ui-react";

import PokemonList from "../pokemon/PokemonList";

function Dashboard() {
  return (
    <div align="center">
      <div
        style={{
          align: "center",
          height: "100%",
          width: "65%",
          backgroundColor: "#DDD",
          padding: "10px",
        }}
      >
        <Grid container textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Button as={Link} to="/pokemon/list">
                Pokemon List
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>Item List</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button>Other List</Button>
            </Grid.Column>
            <Grid.Column>
              <Button>Other List</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Dashboard;
