import React from "react";

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
        <PokemonList />
      </div>
    </div>
  );
}

export default Dashboard;
