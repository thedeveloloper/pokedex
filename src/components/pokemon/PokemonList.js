import React from "react";

import PokemonCard from "./PokemonCard";

function PokemonList() {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null,
  };
  return (
    <div>
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
    </div>
  );
}

export default PokemonList;
