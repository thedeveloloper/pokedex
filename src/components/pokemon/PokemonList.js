import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Divider } from "semantic-ui-react";

import PokemonCard from "./PokemonCard";
import PageSelector from "../layout/PageSelector";

function PokemonList() {
  let [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  let [prevPage, setPrevPage] = useState(null);
  let [nextPage, setNextPage] = useState(null);
  let [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(currentPage).then((res) => {
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setPokemon(res.data["results"]);
    });
  }, [currentPage]);

  function onNextClickHandler() {
    setCurrentPage(nextPage);
  }
  function onPrevClickHandler() {
    setCurrentPage(prevPage);
  }

  return (
    <div>
      <div align="center">
        <PageSelector
          onNextClick={onNextClickHandler}
          onPrevClick={onPrevClickHandler}
        />
      </div>
      <Divider />
      {pokemon ? (
        <Grid align="center" columns={5}>
          {pokemon.map((p) => (
            // <div style={{ padding: 10 }}>
            <Grid.Column>
              <PokemonCard key={p.name} name={p.name} url={p.url} />
            </Grid.Column>
            // </div>
          ))}
        </Grid>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
      <Divider />
      <div align="center">
        <PageSelector
          onNextClick={onNextClickHandler}
          onPrevClick={onPrevClickHandler}
        />
      </div>
    </div>
  );
}

export default PokemonList;
