import React, { useState, useEffect } from "react";

import { Grid, Divider, Header, Container } from "semantic-ui-react";

import PokemonCard from "./PokemonCard";
import PageSelector from "../layout/PageSelector";

import { getPokemonList } from "../../services/GetPokemon";

function PokemonList() {
  let [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  let [prevPage, setPrevPage] = useState(null);
  let [nextPage, setNextPage] = useState(null);
  let [pokemon, setPokemon] = useState(null);
  let [isLoading, setIsLoading] = useState(null);

  function onNextClickHandler() {
    setCurrentPage(nextPage);
  }
  function onPrevClickHandler() {
    setCurrentPage(prevPage);
  }

  useEffect(() => {
    const changePage = async () => {
      setIsLoading(true);
      const res = await getPokemonList(currentPage);
      console.log(res);
      setPrevPage(res.prevPage);
      setNextPage(res.nextPage);
      setPokemon(res["results"]);
      setIsLoading(false);
    };
    changePage();
  }, [currentPage]);

  return (
    <Container>
      <Divider />
      <div align="center">
        <PageSelector
          onNextClick={onNextClickHandler}
          onPrevClick={onPrevClickHandler}
        />
      </div>
      <Divider />
      {isLoading ? (
        <Header align="center">Loading Pokemon...</Header>
      ) : (
        <Grid align="center" columns={5}>
          {pokemon.map((p) => (
            <Grid.Column>
              <PokemonCard key={p.name} name={p.name} url={p.url} />
            </Grid.Column>
          ))}
        </Grid>
      )}
      <Divider />
      <div align="center">
        <PageSelector
          onNextClick={onNextClickHandler}
          onPrevClick={onPrevClickHandler}
        />
      </div>
      <Divider />
    </Container>
  );
}

export default PokemonList;
