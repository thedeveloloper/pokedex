import React from "react";

import { Divider } from "semantic-ui-react";

import PokemonList from "../pokemon/PokemonList";
import PageSelector from "../layout/PageSelector";

function Dashboard() {
  return (
    <div align="center">
      <PokemonList />
    </div>
  );
}

export default Dashboard;
