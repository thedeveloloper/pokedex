import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Button, Divider } from "semantic-ui-react";

import PokemonCard from "./PokemonCard";

function PokemonList() {
  let [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  let [prevPage, setPrevPage] = useState(null);
  let [nextPage, setNextPage] = useState(null);
  let [pokemon, setPokemon] = useState(null);

  useEffect(async () => {
    const res = await axios.get(currentPage).then((res) => {
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setPokemon(res.data["results"]);
    });
  }, [currentPage]);

  return (
    <div>
      <Button
        onClick={() => {
          setCurrentPage(prevPage);
        }}
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          setCurrentPage(nextPage);
        }}
      >
        Next
      </Button>
      <Divider />
      {pokemon ? (
        <Grid textAlign="center">
          {pokemon.map((pokemon) => (
            <div style={{ padding: 10 }}>
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                // pokemonIndex={ }
              />
            </div>
          ))}
        </Grid>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
      <Divider />
      <Button
        onClick={() => {
          setCurrentPage(prevPage);
        }}
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          setCurrentPage(nextPage);
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default PokemonList;
