import React from "react";

import GetInfo from "../../classes/GetInfo";

import PokemonCard from "./PokemonCard";

function PokemonList() {
  const info = new GetInfo();
  const pm = info.getPokemon();
  return (
    <div align="center">
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
      <PokemonCard />
      <PokemonCard />
    </div>
  );
}

export default PokemonList;
